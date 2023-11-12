import { defineStore } from 'pinia'

export const useRestaurantDirectStore = defineStore('restaurant-direct', {
    state: () => {
        return { restaurantDes: null }
    },

    actions: {
        setRestaurantDes(restaurantDes) {
            this.restaurantDes = restaurantDes
        },
        deleteRestaurant() {
            this.restaurantDes = null
        }
    },
})