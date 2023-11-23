<script setup>





</script>

<template>
    <VRow>
        <VCol cols="10" class="ml-16 mt-16">
            <VCard title="TRỞ THÀNH CHỦ NHÀ HÀNG">


                <VDivider />

                <VCardText>
                    <!-- 👉 Form -->
                    <VForm class="mt-6">
                        <VRow>

                            <VCol cols="10">
                                <VTextField label="TÊN THƯƠNG HIỆU" />
                            </VCol>


                            <VCol class="d-flex flex-column gap-4  v-col-12 v-col-sm-7">
                                <v-dialog width="500">
                                    <template v-slot:activator="{ props }">
                                        <VBtn class="w-50" v-bind="props">Nâng cấp ngay </VBtn>
                                    </template>

                                    <template v-slot:default="{ isActive }">
                                        <v-card title="Xác nhận">
                                            <v-card-text>
                                                Xác nhận
                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer></v-spacer>

                                                <v-btn text="Đóng" @click="isActive.value = false"></v-btn>
                                                <v-btn text="Xác nhận"></v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </template>
                                </v-dialog>
                            </VCol>
                            <VCol class="d-flex flex-row align-center  v-col-12 v-col-sm-7">
                                <VIcon color="error" icon='mdi-asterisk' size={1} />
                                <p class="text-h6 font-italic ma-auto ml-1">Liên hệ admin@gmail.com đễ được hỗ trợ nhanh
                                    nhất</p>
                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>
