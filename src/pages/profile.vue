<script setup>

const passwordData = {
    password: '',
    confirmPassword: ''
}

const isChangePassword = ref(false)






</script>

<template>
    <VRow>
        <VCol cols="12">
            <VCard title="ĐỔI MẬT KHẨU">


                <VDivider />

                <VCardText>
                    <!-- 👉 Form -->
                    <VForm class="mt-6">
                        <VRow>
                            <VCol cols="10">
                                <VTextField v-model="passwordData.password" label="Nhập mật khẩu mới" />
                            </VCol>
                            <VCol cols="10">
                                <VTextField v-model="passwordData.confirmPassword" label="Xác nhận mật khẩu" />
                            </VCol>


                            <VCol class="d-flex flex-column gap-4  v-col-12 v-col-sm-7">
                                <div>
                                    <VCheckbox v-model="isChangePassword" label="Xác nhận đổi mật khẩu" />
                                </div>
                                <VBtn class="w-50" :disabled="!isChangePassword">Đổi mật khẩu</VBtn>

                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="12">

            <VBtn class="ml-4 mt-3" color="error">
                Đăng xuất
            </VBtn>

        </VCol>
    </VRow>
</template>
