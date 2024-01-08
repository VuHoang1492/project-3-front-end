<script setup>
import { getFollowRestaurant } from '@/services/axios/api/api';
import FavoriteRestaurantCard from '@/views/card/FavoriteRestaurantCard.vue'
import { reactive } from 'vue';

const data = reactive([])
getFollowRestaurant().then(res => {
    res.data.data.forEach(item => {
        data.push(item)
    })
}).catch(err => {
    console.log(err);
})
</script>

<template>
    <VRow>
        <VCol cols="12" class="ml-16 mt-16">

            <p class="text-2xl mb-6">
                Nhà hàng theo dõi
            </p>
            <FavoriteRestaurantCard v-for="item in data" :restaurant="item"></FavoriteRestaurantCard>

        </VCol>
    </VRow>
</template>
