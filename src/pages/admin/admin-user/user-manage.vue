<script setup>
import { ref } from 'vue'
import User from './user.vue'
import UserBlock from './user-block.vue'

const tab = ref(null)
</script>

<template>
    <div class="pt-2">
        <v-tabs v-model="tab">
            <v-tab width="40%" value="user">Quản lý người dùng</v-tab>
            <v-tab width="40%" value="block">Danh sách bị block</v-tab>
        </v-tabs>

        <v-card-text>
            <v-window v-model="tab">
                <v-window-item value="user">
                    <User></User>
                </v-window-item>
                <v-window-item value="block">
                    <UserBlock></UserBlock>
                </v-window-item>
            </v-window>
        </v-card-text>
    </div>
</template>

<style lang="scss" scoped></style>
