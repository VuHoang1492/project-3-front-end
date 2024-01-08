
import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
    state: () => {
        return { open: false, mes: null }
    },

    actions: {
        openToast(mes) {
            this.open = true
            this.mes = mes
        },

        closeToast() {
            this.open = false
            this.mes = null
        }
    },
})