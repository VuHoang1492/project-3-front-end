<script setup>
import FavoriteRestaurantCard from '@/views/card/FavoriteRestaurantCard.vue'

</script>

<template>
    <VRow>
        <VCol cols="12" class="ml-16 mt-16">

            <p class="text-2xl mb-6">
                Nhà hàng theo dõi
            </p>
            <FavoriteRestaurantCard></FavoriteRestaurantCard>
            <FavoriteRestaurantCard></FavoriteRestaurantCard>
            <FavoriteRestaurantCard></FavoriteRestaurantCard>
            <FavoriteRestaurantCard></FavoriteRestaurantCard>
            <FavoriteRestaurantCard></FavoriteRestaurantCard>

        </VCol>
    </VRow>
</template>
