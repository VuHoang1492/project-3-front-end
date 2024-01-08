import { getCountNotification } from '@/services/axios/api/api'
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
    state: () => {
        return { count: 0 }
    },

    actions: {
        init(x) {
            this.count = x
        },
        increaseCount() {
            this.count = this.count + 1
        },

        decreaseCount() {
            this.count = this.count - 1
        }
    },
})