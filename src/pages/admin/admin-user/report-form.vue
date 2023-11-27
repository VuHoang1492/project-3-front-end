<script setup>
import ReviewCardManage from '@/views/card/ReviewCardManage.vue'




</script>

<template>
    <VRow>
        <VCol cols="8" class="ma-auto mt-16 d-flex flex-row justify-space-between">
            <div>
                <div class="mb-2 d-flex flex-row align-end">
                    <span class="text-h5 mr-4">Người dùng: </span> <span
                        class="text-body-1 font-italic">User@gmail.com</span>
                </div>
                <div class="mb-2 d-flex flex-row align-start">
                    <span class=" text-h5 mr-4">Lỗi vi phạm: </span>
                    <div class="d-flex flex-column">
                        <span class="text-body-1 font-italic">+ A</span>
                        <span class="text-body-1 font-italic">+ B</span>
                        <span class="text-body-1 font-italic">+ C</span>
                    </div>
                </div>
            </div>
            <v-btn variant="outlined">Block</v-btn>
        </VCol>
        <VCol cols="10" class="ma-auto">
            <VDivider></VDivider>
        </VCol>
        <VCol cols="8" class="ma-auto">
            <span class="text-h5 mr-4">Bài viết bị tố cáo:</span>
        </VCol>
        <VCol cols="6" class="ma-auto">
            <ReviewCardManage></ReviewCardManage>
        </VCol>
        <VCol cols="10" class="ma-auto">
            <VDivider></VDivider>
        </VCol>
        <VCol cols="8" class="ma-auto">
            <span class="text-h5 mr-4">Bài viết khác:</span>
        </VCol>
        <VCol cols="6" class="ma-auto">
            <ReviewCardManage></ReviewCardManage>
            <ReviewCardManage></ReviewCardManage>
            <ReviewCardManage></ReviewCardManage>
            <ReviewCardManage></ReviewCardManage>
        </VCol>
    </VRow>
</template>
