<script setup>
import UpgradeToPro from '@/components/UpgradeToPro.vue'
import { useGeolocation } from '@/services/map/useGeolocation';

useGeolocation()
</script>

<template>
  <VApp>
    <RouterView />
  </VApp>
</template>
