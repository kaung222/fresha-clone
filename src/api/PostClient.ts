import axios from "axios";

const baseURL = "https://post.burmazay.com/api/v1";

export const PostClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

PostClient.interceptors.request.use(
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

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null) => {
//     failedQueue.forEach((prom) => {
//         if (error) {
//             prom.reject(error);
//         } else {
//             prom.resolve(token);
//         }
//     });

//     failedQueue = [];
// };

// PostClient.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             if (isRefreshing) {
//                 return new Promise(function (resolve, reject) {
//                     failedQueue.push({ resolve, reject });
//                 })
//                     .then((token) => {
//                         originalRequest.headers["Authorization"] = "Bearer " + token;
//                         return PostClient(originalRequest);
//                     })
//                     .catch((err) => {
//                         return Promise.reject(err);
//                     });
//             }

//             originalRequest._retry = true;
//             isRefreshing = true;

//             const refreshToken = JSON.parse(localStorage.getItem("refreshToken")!);

//             try {
//                 const { data } = await PostClient.post("/refresh", { refreshToken });
//                 localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
//                 localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
//                 PostClient.defaults.headers.common["Authorization"] =
//                     "Bearer " + data.accessToken;
//                 processQueue(null, data.accessToken);
//                 return PostClient(originalRequest);
//             } catch (err) {
//                 processQueue(err, null);
//                 return Promise.reject(err);
//             } finally {
//                 isRefreshing = false;
//             }
//         }

//         return Promise.reject(error);
//     }
// );
