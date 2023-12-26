<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const onDirect = () => {
    router.push({ path: '/home', query: { restaurantId: 1, direct: true } })
}
</script>

<template>
    <VRow>
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
                            <VBtn color="error" append-icon="mdi-delete-outline">Bỏ theo dõi</VBtn>
                            <VBtn color="primary" append-icon="mdi-location" @click="onDirect">Tới quán ăn</VBtn>
                        </VCardActions>
                    </div>
                </div>
            </VCard>
        </VCol>
    </VRow>
</template>

<style lang="scss" scoped></style>
