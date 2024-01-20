import axios from 'axios';
import {useAuthStore} from '../stores/authStore.js';

const authStore = useAuthStore();
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Add the access token to the Authorization header if available
        if (authStore.accessToken) {
            config.headers.Authorization = `Bearer ${authStore.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
export default axiosInstance;
