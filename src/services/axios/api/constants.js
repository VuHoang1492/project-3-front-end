import { getAccessToken } from "@/services/storage";
import axios from "axios";

export const instanceApiData = axios.create({
    baseURL: 'http://localhost:3000',
});

instanceApiData.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers = { Authorization: `Bearer ${token}`, ...config.headers };
    }
    return config;
});

instanceApiData.interceptors.response.use(undefined, (error) => {
    if (error.response) {
        throw error
    } else if (error.request) {
        alert('Server sập rồi')
    }
});

