import axios from "axios";

const baseUrl = 'https://nominatim.openstreetmap.org';

export const MapClient = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
})
