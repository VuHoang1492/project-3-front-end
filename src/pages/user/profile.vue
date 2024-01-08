<script setup>
import { useRouter } from 'vue-router';
import { Roles } from '@/helpers/roles';
import { useTokenStore } from '@/stores/token';
import { useUserStore } from '@/stores/user';
import { validatePassword } from '@/helpers/validate';
import { changePassword } from '@/services/axios/api/api'

const tokenStore = useTokenStore()
const userStore = useUserStore()
const router = useRouter()



let snackbar = ref(false)
let snackbarText = ref('')
let passwordInvalid = ref(false)

const isChangePassword = ref(false)



const handleLogOut = () => {
    tokenStore.deleteToken()
    userStore.deleteUser()
    router.push('/login')
}

const form = reactive({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const handleChangePassword = () => {

    if (!validatePassword(form.currentPassword)) {
        snackbar.value = true
        snackbarText.value = "Mật khẩu không hợp lệ!! Mật khẩu gồm 8 kí tự, ít nhất 1 chữ số và không có khoảng trắng"
        passwordInvalid.value = true
        return
    }
    if (!validatePassword(form.newPassword)) {
        snackbar.value = true
        snackbarText.value = "Mật khẩu không hợp lệ!! Mật khẩu gồm 8 kí tự, ít nhất 1 chữ số và không có khoảng trắng"
        passwordInvalid.value = true
        return
    }
    if (!validatePassword(form.confirmPassword)) {
        snackbar.value = true
        snackbarText.value = "Mật khẩu không hợp lệ!! Mật khẩu gồm 8 kí tự, ít nhất 1 chữ số và không có khoảng trắng"
        passwordInvalid.value = true
        return
    }
    if (form.newPassword !== form.confirmPassword) {
        snackbar.value = true
        snackbarText.value = "Xác nhận lại mật khẩu mới!!"
        passwordInvalid.value = true
        return
    }


    changePassword(form.currentPassword, form.newPassword)
        .then(res => {
            console.log(res);
            snackbar.value = true
            snackbarText.value = "Đổi mật khẩu thành công"
        }).catch(err => {
            const code = err.response.status
            if (code === 401 || code === 400) {
                snackbar.value = true
                snackbarText.value = "Nhập mật khẩu không đúng!"
                passwordInvalid.value = true
            }
        })
}

</script>

<template>
    <VRow>
        <VCol v-if="userStore.user.role !== Roles.ADMIN" cols="10" class="ml-16 mt-16">
            <VCard title="ĐỔI MẬT KHẨU">


                <VDivider />

                <VCardText>
                    <!-- 👉 Form -->
                    <VForm class="mt-6">
                        <VRow>
                            <VCol cols="10">
                                <VTextField v-model="form.currentPassword" label="Nhập mật khẩu hiện tại"
                                    :error="passwordInvalid" @change="() => { passwordInvalid = false }" />
                            </VCol>
                            <VCol cols="10">
                                <VTextField v-model="form.newPassword" label="Nhập mật khẩu mới" :error="passwordInvalid"
                                    @change="() => { passwordInvalid = false }" />
                            </VCol>
                            <VCol cols="10">
                                <VTextField v-model="form.confirmPassword" label="Xác nhận mật khẩu"
                                    :error="passwordInvalid" @change="() => { passwordInvalid = false }" />
                            </VCol>


                            <VCol class="d-flex flex-column gap-4  v-col-12 v-col-sm-7">
                                <div>
                                    <VCheckbox v-model="isChangePassword" label="Xác nhận đổi mật khẩu" />
                                </div>
                                <VBtn class="w-50" :disabled="!isChangePassword" @click="handleChangePassword">Đổi mật khẩu
                                </VBtn>

                            </VCol>
                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="12">

            <VBtn class="ml-4 mt-3" color="error" @click="handleLogOut">
                Đăng xuất
            </VBtn>

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
