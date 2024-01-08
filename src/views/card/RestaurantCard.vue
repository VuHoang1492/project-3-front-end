<script setup>
import { useRouter } from 'vue-router';
import { useToastStore } from '@/stores/toast';
import { deleteRestaurant } from '@/services/axios/api/api';

const toast = useToastStore()
const props = defineProps(['restaurant_data'])

const router = useRouter()
const handleDelete = (id) => {
    deleteRestaurant(id).then(res => {
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
        <!-- 👉 Apple iPhone 11 Pro -->
        <VCol cols="10">
            <VCard>
                <div class="d-flex   flex-nowrap flex-row">
                    <div class="w-25">
                        <VImg width="100%" height="100%" cover :src="props.restaurant_data.thumbnail" />
                    </div>
                    <div class="w-75 pl-4">
                        <VCardItem>
                            <VCardTitle>{{ props.restaurant_data.restaurantName }}</VCardTitle>
                        </VCardItem>
                        <v-rating class="ml-4" v-model="props.restaurant_data.rating" active-color="warning" color="warning"
                            readonly empty-icon="mdi-star-outline" full-icon="mdi-star" half-increments :size="30"
                            length="10"></v-rating>

                        <VCardActions class="d-flex">

                            <v-dialog width="500">
                                <template v-slot:activator="{ props }">
                                    <VBtn v-bind="props" variant="text" color="error">Xóa </VBtn>
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card title="Xác nhận">
                                        <v-card-text>
                                            Xác nhận xóa
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn text="Đóng" @click="isActive.value = false"></v-btn>
                                            <v-btn variant="text" color="error" @click="() => {
                                                handleDelete(props.restaurant_data._id)
                                                isActive.value = false
                                            }">Xóa</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>
                            <VBtn color="primary" append-icon="mdi-pencil-box-multiple-outline" @click="() => {
                                router.push(`manage-restaurant/${props.restaurant_data._id}`)
                            }">Chỉnh sửa
                            </VBtn>
                        </VCardActions>
                    </div>
                </div>
            </VCard>
        </VCol>
    </VRow>
</template>

<style lang="scss" scoped></style>
