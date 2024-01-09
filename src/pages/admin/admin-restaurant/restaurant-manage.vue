<script setup>
import { ref } from 'vue'
import Restaurant from './restaurant.vue'
import RestaurantCreate from './restaurant-create.vue'

import { useRouter } from 'vue-router';

const router = useRouter()
let curTab = router.currentRoute.value.hash
curTab = curTab.slice(1, curTab.length)

const tab = ref(null)

if (['restaurant', 'create'].includes(curTab)) tab.value = curTab

const updateRoute = (tab) => router.push(`#${tab}`)
</script>

<template>
    <div class="pt-2">
        <v-tabs v-model="tab">
            <v-tab width="40%" value="restaurant" @click="updateRoute('restaurant')">Tra cứu nhà hàng</v-tab>
            <v-tab width="40%" value="create" @click="updateRoute('create')">Tạo nhà hàng</v-tab>
        </v-tabs>

        <v-card-text>
            <v-window v-model="tab">
                <v-window-item value="restaurant">
                    <Restaurant></Restaurant>
                </v-window-item>
                <v-window-item value="create">
                    <RestaurantCreate></RestaurantCreate>
                </v-window-item>
            </v-window>
        </v-card-text>
    </div>
</template>

<style lang="scss" scoped></style>
