// stores/counter.js
import { getAccessToken, removeAccessToken, setAccessToken } from '@/services/storage'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', {
    state: () => {
        return { accessToken: getAccessToken() }
    },

    actions: {
        setToken(token) {
            this.accessToken = token
            setAccessToken(token)
        },

        deleteToken() {
            this.accessToken = null
            removeAccessToken()
        }
    },
})