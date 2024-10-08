import axios from "axios";

// const baseURL = "http://13.212.173.149:9000/api/v1";
const baseURL = "https://chat.clinic.burmazay.com/api/v1";
// const baseURL = "http://3.0.133.180:9000/api/v1";

export const ConversationClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

ConversationClient.interceptors.request.use(
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
