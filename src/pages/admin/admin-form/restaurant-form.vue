<script setup>
import MapLeaf from '@/components/MapLeaf.vue';
import { computed } from 'vue';
import { reactive } from 'vue';
import { ref } from 'vue'




</script>

<template>
    <VRow>
        <VCol cols="11" class="ml-16 mt-16">
            <VCard>

                <VCardItem>
                    <VForm class="mt-4">
                        <VRow>
                            <VCol cols="12">
                                <VTextField label="Người Sở Hữu" disabled />
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>
                            <VCol cols="12">
                                <VTextField label="Email" disabled />
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>
                            <VCol cols="12">
                                <VTextField label="Số Điện Thoại" disabled />
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>
                            <VCol cols="12">
                                <VTextField label="Thương Hiệu" disabled />
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>
                            <VCol cols="12">
                                <VTextField label="Tên Cửa Hàng" disabled />
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>



                            <VCol cols="5">
                                <v-text-field label="GIỜ MỞ CỬA" type="time" disabled></v-text-field>
                            </VCol>
                            <VCol cols="5">
                                <v-text-field label="GIỜ ĐÓNG CỬA" type="time" disabled></v-text-field>
                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>


                            <VCol cols="12">
                                <div class="d-flex flex-row flex-wrap">
                                    <v-checkbox class="ml-6" label="Thứ Hai" disabled></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Ba" disabled></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Tư" disabled></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Năm" disabled></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Sáu" disabled></v-checkbox>
                                    <v-checkbox class="ml-6" label="Thứ Bảy" disabled></v-checkbox>
                                    <v-checkbox class="ml-6" label="Chủ Nhật" disabled></v-checkbox>
                                    <v-checkbox class="ml-6" label="Tất cả" disabled></v-checkbox>
                                </div>

                            </VCol>


                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>



                            <VCol cols="12">
                                <VTextarea clearable no-resize rows="5" label="MÔ TẢ" disabled />
                            </VCol>

                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>




                            <VCol cols="12">
                                img
                            </VCol>

                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>



                            <VCol cols="6">
                                <VTextField label="TỌA ĐỘ" disabled />

                            </VCol>
                            <VCol cols="6">
                                <VTextField label="ĐỊA CHỈ" disabled />

                            </VCol>
                            <VCol cols="12">
                                <div style="height: 500px;">
                                    <MapLeaf :allow_click_map="false" :geocoder="false" />
                                </div>
                            </VCol>

                            <VCol cols="12">
                                <VDivider></VDivider>
                            </VCol>

                            <VCol cols="12" class="d-flex flex-column">
                                <v-checkbox class="m-4 w-25" color="error" label="Xác nhận tạo cửa hàng">
                                </v-checkbox>

                                <div class="d-flex flex-row mt-4">
                                    <VBtn class="mr-4" width="100px" color="success">
                                        Xác nhận
                                    </VBtn>
                                    <VBtn class="mr-4" width="100px" color="error">
                                        Từ chối
                                    </VBtn>
                                </div>

                            </VCol>
                        </VRow>
                    </VForm>
                </VCardItem>
            </VCard>
        </VCol>
    </VRow>
</template>
