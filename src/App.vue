<script setup>

import { useGeolocation } from '@/services/map/useGeolocation';
import { useTokenStore } from './stores/token';
import { useUserStore } from './stores/user';
import { getUserProfile } from '@/services/axios/api/api'
import { useToastStore } from './stores/toast';

const toast = useToastStore()

useGeolocation()

const userStore = useUserStore()
const tokenStore = useTokenStore()

if (tokenStore.accessToken) {
  getUserProfile().then(res => {
    const response = res.data
    userStore.setUser(response.data.user)
  }).catch(err => {
    console.log(err);
    tokenStore.deleteToken()
    userStore.deleteUser()
    router.push('/login')
  })
}



</script>

<template>
  <VApp>
    <RouterView />
  </VApp>
  <v-snackbar v-model="toast.open" :timeout="5000" color="primary" location="top">
    {{ toast.mes }}

    <template v-slot:actions>
      <v-btn color="blue" variant="text" @click="() => toast.closeToast()">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
