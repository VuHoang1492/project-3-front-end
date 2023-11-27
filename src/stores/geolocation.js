// stores/counter.js
import { defineStore } from 'pinia'

export const useGeolocationStore = defineStore('geolocation', {
    state: () => {
        return { latitude: null, longitude: null, accept: true }
    },

    actions: {
        change(newLat, newLng) {
            this.latitude = newLat
            this.longitude = newLng
        },
        decline() {
            this.accept = false
        }
    },
})