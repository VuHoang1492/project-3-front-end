<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()


</script>

<template>
    <VRow>
        <!-- 👉 Apple iPhone 11 Pro -->
        <VCol cols="10">
            <VCard>
                <div class="d-flex   flex-nowrap flex-row">
                    <div class="w-25">
                        <VImg width="100%" height="100%" cover
                            src="https://media.timeout.com/images/106000654/1920/1080/image.jpg" />
                    </div>
                    <div class="w-75 pl-4">
                        <VCardItem>
                            <VCardTitle>Restaurant Name</VCardTitle>
                        </VCardItem>
                        <VCardText>
                            Description for restaurant


                        </VCardText>
                        <VCardActions class="d-flex">
                            <VBtn color="error" append-icon="mdi-delete-outline">Xóa</VBtn>
                            <VBtn color="primary" append-icon="mdi-pencil-box-multiple-outline" @click="() => {
                                router.push(`manage-restaurant/id`)
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
