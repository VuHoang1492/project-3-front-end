<script setup>
import { useGeolocation } from '@/services/map/useGeolocation';

useGeolocation()


</script>

<template>
  <VApp>
    <RouterView />
  </VApp>
</template>
