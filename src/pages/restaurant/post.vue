<script setup>
import PostCardManage from '@/views/card/PostCardManage.vue'
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <VRow class="d-flex">
        <div class="btn-control ">
            <v-tooltip text="Thêm bài cho cửa hàng hiện tại   " location="bottom">
                <template v-slot:activator="{ props }">
                    <VCard>
                        <VBtn v-bind="props" variant="text" color="primary" icon="mdi-note-plus-outline"
                            @click="() => router.push('post/create/restaurantId')" />
                    </VCard>
                </template>
            </v-tooltip>
        </div>
        <VCol cols="9" class="ma-auto mt-8">
            <VRow>
                <VCol cols="6" class="ma-auto mb-8">
                    <VSelect label="CHỌN NHÀ HÀNG"
                        :items="['Nhà hàng 1', 'Nhà hàng 2', 'Nhà hàng 3', 'Nhà hàng 4', 'Nhà hàng 5', 'Nhà hàng 6']">
                    </VSelect>
                </VCol>


                <VCol cols="9" class="ml-auto mr-auto mb-8 d-flex flex-column">
                    <PostCardManage></PostCardManage>
                    <PostCardManage></PostCardManage>
                    <PostCardManage></PostCardManage>
                    <PostCardManage></PostCardManage>


                </VCol>

            </VRow>



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