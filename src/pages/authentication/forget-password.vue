<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router'
import { forgetPassword, getUserProfile } from '@/services/axios/api/api'
import { validateEmail } from '@/helpers/validate.js'
import { useTokenStore } from '@/stores/token'
import { useUserStore } from '@/stores/user';

const router = useRouter()

const useToken = useTokenStore()
const userStore = useUserStore()





let loginFailed = ref(false)

let emailInvalid = ref(false)
let snackbar = ref(false)
let snackbarText = ref('')


const form = reactive({
    email: ''
})





const handleSendMail = () => {

    if (!validateEmail(form.email)) {
        snackbar.value = true
        snackbarText.value = "Email  is invalid!!!"
        emailInvalid.value = true
        return
    }


    forgetPassword(form.email, form.password).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
        // if (err.response.status == 401) {
        //     snackbar.value = true
        //     snackbarText.value = "Log in false. Check your email or password!!!"
        // } else if (err.response.status == 500) {
        //     snackbar.value = true
        //     snackbarText.value = "Server error!!!"
        // }
    })
}





</script>

<template>
    <div class="auth-wrapper d-flex align-center justify-center pa-4">
        <VCard class="auth-card pa-4 pt-7" min-width="400px">
            <VCardItem class="justify-center">
                <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
                    MAP FOOD
                </VCardTitle>
            </VCardItem>



            <VCardText>
                <VForm>
                    <VRow>
                        <!-- email -->
                        <VCol cols="12">
                            <VTextField label="Email" type="email" v-model="form.email" :error="loginFailed || emailInvalid"
                                @change="() => {
                                    loginFailed = false,
                                        emailInvalid = false
                                }" />
                        </VCol>



                        <VCol cols="12">

                            <VBtn class="mt-4" block @click="handleSendMail">
                                Gửi mail khôi phục
                            </VBtn>
                            <VBtn class="mt-4" block @click="() => { router.push('/home') }">
                                Đến trang chủ
                            </VBtn>
                        </VCol>
                    </VRow>
                </VForm>
            </VCardText>
        </VCard>

    </div>


    <v-snackbar v-model="snackbar" :timeout="5000" color="primary" location="top">
        {{ snackbarText }}

        <template v-slot:actions>
            <v-btn color="blue" variant="text" @click="snackbar = false">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<style lang="scss" scoped>
@use "@core/scss/pages/page-auth.scss";
</style>
