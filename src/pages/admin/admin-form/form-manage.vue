<script setup>
import { ref } from 'vue'
import Brand from './brand.vue'
import Restaurant from './restaurant.vue'
import { useRouter } from 'vue-router';

const router = useRouter()
let curTab = router.currentRoute.value.hash
curTab = curTab.slice(1, curTab.length)

const tab = ref(null)

if (['brand', 'restaurant'].includes(curTab)) tab.value = curTab

const updateRoute = (tab) => router.push(`#${tab}`)
</script>

<template>
    <div class="pt-2">
        <v-tabs v-model="tab">
            <v-tab width="40%" value="brand" @click="updateRoute('brand')">Thương hiệu</v-tab>
            <v-tab width="40%" value="restaurant" @click="updateRoute('restaurant')">Nhà hàng</v-tab>
        </v-tabs>

        <v-card-text>
            <v-window v-model="tab">
                <v-window-item value="brand">
                    <Brand />
                </v-window-item>
                <v-window-item value="restaurant">
                    <Restaurant></Restaurant>
                </v-window-item>
            </v-window>
        </v-card-text>
    </div>
</template>

<style lang="scss" scoped></style>
