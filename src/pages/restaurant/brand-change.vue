<script setup>

const name = ref('BRAND NAME')

</script>

<template>
    <VRow>
        <VCol cols="11" class="ml-16 mt-16">
            <VCard>


                <VCardText>
                    <!-- 👉 Form -->
                    <VForm class="mt-6">
                        <VRow>

                            <VCol cols="10">
                                <VTextField label="TÊN HIỆN TẠI" v-model="name" disabled />
                            </VCol>

                            <VCol cols="10">
                                <VTextField label="TÊN MỚI" v-model="name" />
                            </VCol>


                            <VCol class="d-flex flex-column gap-4  v-col-12 v-col-sm-7">
                                <v-dialog width="500">
                                    <template v-slot:activator="{ props }">
                                        <VBtn class="w-50" v-bind="props">Lưu thay đổi </VBtn>
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
                                <VBtn class="w-50" color="error">Hủy </VBtn>

                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>
