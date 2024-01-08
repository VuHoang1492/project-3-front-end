<script setup>
import RestaurantCard from '@/views/card/RestaurantCard.vue'
import { useRouter } from 'vue-router';
import { onBeforeUnmount, onMounted } from "vue"
import { getAllRestaurant } from '@/services/axios/api/api';
import { reactive } from 'vue';
import { useUserStore } from '@/stores/user';

const router = useRouter()
const userStore = useUserStore()

// function logScroll() {
//     if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {

//     }
// }

// onMounted(() => {
//     window.addEventListener('scroll', logScroll)
// })

// onBeforeUnmount(() => {
//     window.removeEventListener('scroll', logScroll)
// })  



const data = reactive([])
getAllRestaurant().then(res => {
    res.data.data.forEach(item => {
        data.push(item)
    })
}).catch(err => {
    console.log(err);
})

</script>

<template>
    <VRow class="d-flex">
        <VCol cols="9" class="ma-auto mt-8">

            <div class="mb-6">
                <div>
                    <div class="d-flex flex-row mb-6">
                        <p class="font-italic text-2xl ma-auto ml-1 mr-1">
                            {{ userStore.user.brandName }}
                        </p>

                    </div>

                </div>
                <div class="btn-control ">
                    <v-tooltip text="Sửa tên thương hiệu" location="bottom">
                        <template v-slot:activator="{ props }">
                            <VCard>
                                <VBtn v-bind="props" variant="text" color="primary" icon="mdi-pencil-box-multiple-outline"
                                    @click="() => router.push('manage-restaurant/brand')" />
                            </VCard>
                        </template>
                    </v-tooltip>

                    <v-tooltip text="Tạo cửa hàng   " location="bottom">
                        <template v-slot:activator="{ props }">
                            <VCard>
                                <VBtn v-bind="props" variant="text" color="primary" icon="mdi-store-plus"
                                    @click="() => router.push('manage-restaurant/create')" />
                            </VCard>
                        </template>
                    </v-tooltip>
                </div>
            </div>

            <RestaurantCard v-for="item in data" :restaurant_data="item"></RestaurantCard>
        </VCol>
    </VRow>
</template>


<style scoped lang="scss">
.btn-control {
    position: fixed;
    right: 100px;
    top: 100px;
    display: flex;
    flex-direction: row;
    gap: 10px;
}
</style>