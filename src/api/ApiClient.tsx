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

// const refreshAccessToken = async (): Promise<string> => {
//     try {
//         const response = await ApiClient.post("/refresh", {
//             refreshToken: localStorage.getItem("refresh_token"),
//         });

//         const { accessToken } = response.data;

//         localStorage.setItem("access_token", accessToken);

//         return accessToken;
//     } catch (error) {
//         console.error("Failed to refresh access token", error);
//         throw error;
//     }
// };

// ApiClient.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         if (
//             error.response &&
//             error?.response?.status == 401 &&
//             !originalRequest?._retry
//         ) {
//             originalRequest._retry = true;

//             try {
//                 const newAccessToken = await refreshAccessToken();
//                 originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

//                 return ApiClient(originalRequest);
//             } catch (refreshError) {
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );