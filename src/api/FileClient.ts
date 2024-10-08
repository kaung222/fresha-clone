import axios from "axios";


const baseURL = "https://burmazay.com/api/v1";

export const FileClient = axios.create({
    baseURL,
    headers: {
        "Content-Type": "Application/json",
    },
    withCredentials: true,
});

FileClient.interceptors.request.use(
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

