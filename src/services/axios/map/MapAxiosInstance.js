import axios from 'axios'

export const mapAxiosInstance = axios.create({
    baseURL: 'https://nominatim.openstreetmap.org'
});