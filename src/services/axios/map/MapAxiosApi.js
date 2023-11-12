import { mapAxiosInstance } from "./MapAxiosInstance";

export const getLocationByLatlng = (lat, lon) => {
    return mapAxiosInstance.get('/reverse', {
        params: {
            lat: lat,
            lon: lon,
            format: 'json'
        }
    })
}