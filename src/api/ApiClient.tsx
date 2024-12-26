import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ApiClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "Application/json",
    },
    withCredentials: true,
});

ApiClient.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${JSON.parse(accessToken)}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: any = [];

// Function to handle the queue of requests during refresh
const processQueue = (error: Error | null, token = null) => {
    failedQueue.forEach((promise: any) => {
        if (token) {
            promise.resolve(token);
        } else {
            promise.reject(error);
        }
    });
    failedQueue = [];
};

// Response interceptor to handle token expiration
ApiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // console.log(error)
        // If the error is 401 and the request was not retried
        console.log(error.response)
        if (error.response?.status == 401 && error.response?.data?.message == "Role cannot access!") {
            return localStorage.clear()
        }
        if (error.response?.status === 401 && (error.response?.data?.message == "jwt expired") && !originalRequest._retry) {
            if (isRefreshing) {
                // Queue requests while refresh is ongoing
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers["Authorization"] = `Bearer ${token}`;
                        return axios(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const accessToken = localStorage.getItem("accessToken");
                // Call refresh token API
                const response = await ApiClient.get(`${baseURL}/auth/refresh`);
                console.log(response)
                const { accessToken: newAccessToken } = response.data;

                // Store new access token
                localStorage.setItem("accessToken", JSON.stringify(newAccessToken));

                // Update the failed requests queue
                processQueue(null, newAccessToken);

                // Retry the original request with the new access token
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (err: any) {
                processQueue(err, null);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);