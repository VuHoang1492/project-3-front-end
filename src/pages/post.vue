<script setup>
import PostCard from '@/views/card/PostCard.vue'
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <VRow class="d-flex">
        <div class="btn-control ">
            <v-tooltip text="Tạo cửa hàng   " location="bottom">
                <template v-slot:activator="{ props }">
                    <VCard>
                        <VBtn v-bind="props" variant="text" color="primary" icon="mdi-note-plus-outline"
                            @click="() => router.push('post/create/restaurantId')" />
                    </VCard>
                </template>
            </v-tooltip>
        </div>
        <VCol cols="9" class="ma-auto">
            <VCard class="ma-8  pa-16">
                <VRow>
                    <VCol cols="10" class="ma-auto mb-8">
                        <VCard>
                            <VCol cols="12">
                                <VSelect label="CHỌN NHÀ HÀNG"
                                    :items="['Nhà hàng 1', 'Nhà hàng 2', 'Nhà hàng 3', 'Nhà hàng 4', 'Nhà hàng 5', 'Nhà hàng 6']">
                                </VSelect>
                            </VCol>
                        </VCard>
                    </VCol>
                    <VCol cols="10" class="ml-auto mr-auto mb-8">
                        <PostCard></PostCard>

                        <VDivider />
                    </VCol>
                    <VCol cols="10" class="ml-auto mr-auto mb-8">
                        <PostCard></PostCard>

                        <VDivider />
                    </VCol>
                    <VCol cols="10" class="ml-auto mr-auto mb-8">
                        <PostCard></PostCard>

                        <VDivider />
                    </VCol>
                    <VCol cols="10" class="ml-auto mr-auto mb-8">
                        <PostCard></PostCard>

                        <VDivider />
                    </VCol>
                    <VCol cols="10" class="ml-auto mr-auto mb-8">
                        <PostCard></PostCard>

                        <VDivider />
                    </VCol>
                    <VCol cols="10" class="ml-auto mr-auto mb-8">
                        <PostCard></PostCard>
                        <VDivider />
                    </VCol>
                </VRow>
            </VCard>


        </VCol>
    </VRow>
</template>


<style scoped lang="scss">
.btn-control {
    position: fixed;
    right: 100px;
    top: 100px;

}
</style>