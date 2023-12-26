<script setup>
import { useGeolocation } from '@/services/map/useGeolocation';
import { useTokenStore } from './stores/token';
import { useUserStore } from './stores/user';
import { getUserProfile } from '@/services/axios/api/api'


useGeolocation()

const userStore = useUserStore()
const tokenStore = useTokenStore()

if (tokenStore.accessToken) {
  getUserProfile().then(res => {
    const user = res.data.data
    userStore.setUser(user)
  }).catch(err => {
    console.log(err);
  })
}


</script>

<template>
  <VApp>
    <RouterView />
  </VApp>
</template>
