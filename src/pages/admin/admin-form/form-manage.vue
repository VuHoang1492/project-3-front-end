<script setup>
import { ref } from 'vue'
import Brand from './brand.vue'
import Restaurant from './restaurant.vue'

const tab = ref(null)
</script>

<template>
    <div class="pt-2">
        <v-tabs v-model="tab">
            <v-tab width="40%" value="brand">Thương hiệu</v-tab>
            <v-tab width="40%" value="restaurant">Nhà hàng</v-tab>

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
