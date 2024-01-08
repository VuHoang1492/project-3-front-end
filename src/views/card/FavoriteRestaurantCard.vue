<script setup>
import { unfollowRestaurant } from '@/services/axios/api/api';
import { useRouter } from 'vue-router';
import { useToastStore } from '@/stores/toast';


const toast = useToastStore();

const props = defineProps(['restaurant'])

const router = useRouter()

const onDirect = (id) => {
    router.push({ path: '/home', query: { restaurantId: id, direct: true } })
}

const handleUnfollow = (id) => {
    unfollowRestaurant(id).then(res => {
        console.log(res);
        toast.openToast('Hành động thành công!')
    }).catch(err => {
        console.log(err);
        toast.openToast('Có lỗi xảy ra!')
    })
}
</script>

<template>
    <VRow>
        <VCol cols="10">
            <VCard>
                <div class="d-flex   flex-nowrap flex-row">
                    <div class="w-25">
                        <VImg width="100%" height="100%" cover :src="props.restaurant.thumbnail" />
                    </div>
                    <div class="w-75 pl-4">
                        <VCardItem>
                            <VCardTitle>{{ props.restaurant.restaurantName }}</VCardTitle>
                        </VCardItem>
                        <v-rating class="ml-4" v-model="props.restaurant.rating" active-color="warning" color="warning"
                            readonly empty-icon="mdi-star-outline" full-icon="mdi-star" half-increments :size="30"
                            length="10"></v-rating>

                        <VCardActions class="d-flex">

                            <v-dialog width="500">
                                <template v-slot:activator="{ props }">
                                    <VBtn color="error" append-icon="mdi-delete-outline" v-bind="props">Bỏ theo dõi</VBtn>
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card title="Xác nhận">
                                        <v-card-text>
                                            Bỏ theo dõi
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn text="Đóng" @click="isActive.value = false"></v-btn>
                                            <v-btn text="Xác nhận" color="error" @click="() => {
                                                handleUnfollow(props.restaurant._id)
                                                isActive.value = false
                                            }">Bỏ theo dõi</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                            <VBtn color="primary" append-icon="mdi-location" @click="onDirect(props.restaurant._id)">Tới
                                quán ăn</VBtn>
                        </VCardActions>
                    </div>
                </div>
            </VCard>
        </VCol>
    </VRow>
</template>

<style lang="scss" scoped></style>
