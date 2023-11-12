import { defineStore } from 'pinia'

export const useRestaurantStore = defineStore('restaurant', {
    state: () => {
        return { restaurant: null, show: false }
    },

    actions: {
        setRestaurant(restaurant) {
            this.restaurant = restaurant
        },
        deleteRestaurant() {
            this.restaurant = null
        },
        hiddenCard() {
            this.show = false
        },
        showCard() {
            this.show = true
        }
    },
})