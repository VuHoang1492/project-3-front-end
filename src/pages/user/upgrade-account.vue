<script setup>
import { upgrade } from '@/services/axios/api/api'

let snackbar = ref(false)
let snackbarText = ref('')

const form = reactive({
    userName: '',
    brandName: '',
    numberPhone: '',
    level: ''
})

const handleUpgrade = () => {
    upgrade(form).then(res => {
        console.log(res);
        snackbar.value = true
        snackbarText.value = "Đơn đã được gửi! Vui lòng chờ phê duyệt hoặc liên hệ Admin!"
    }).catch(err => {
        console.log(err);
        snackbar.value = true
        snackbarText.value = "Có lỗi xảy ra!"
    })
}


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
                                <VTextField label="Họ Và Tên Người Sở Hữu" v-model="form.userName" />
                            </VCol>
                            <VCol cols="10">
                                <VTextField label="Tên Thương Hiệu" v-model="form.brandName" />
                            </VCol>
                            <VCol cols="10">
                                <VTextField label="Số điện thoại" v-model="form.numberPhone" />
                            </VCol>
                            <VCol cols="10">
                                <v-radio-group v-model="form.level">
                                    <v-radio label="Trải nghiệm" value="trial"></v-radio>
                                    <v-radio label="Vip" value="vip"></v-radio>
                                </v-radio-group>
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
                                                <v-btn text="Xác nhận" @click="{
                                                    isActive.value = false
                                                    handleUpgrade();
                                                }"></v-btn>
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
    <v-snackbar v-model="snackbar" :timeout="5000" color="primary" location="top">
        {{ snackbarText }}

        <template v-slot:actions>
            <v-btn color="blue" variant="text" @click="snackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>
