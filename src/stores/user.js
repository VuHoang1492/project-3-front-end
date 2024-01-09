import { Roles } from '@/helpers/roles'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return { user: null }
    },

    actions: {
        setUser(user) {
            this.user = user
        },

        deleteUser() {
            this.user = { role: Roles.GUEST }
        }
    },
})