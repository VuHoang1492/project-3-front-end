<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router'
import { getUserProfile, login } from '@/services/axios/api/api'
import { validateEmail, validatePassword } from '@/helpers/validate.js'
import { useTokenStore } from '@/stores/token'
import { useUserStore } from '@/stores/user';

const router = useRouter()

const useToken = useTokenStore()
const userStore = useUserStore()





const isPasswordVisible = ref(false)
let loginFailed = ref(false)
let passwordInvalid = ref(false)
let emailInvalid = ref(false)
let snackbar = ref(false)
let snackbarText = ref('')


const form = reactive({
  email: '',
  password: '',
})


const handleLogIn = () => {

  if (!validateEmail(form.email)) {
    snackbar.value = true
    snackbarText.value = "Email  không hợp lệ!!!"
    emailInvalid.value = true
    return
  }

  if (!validatePassword(form.password)) {
    snackbar.value = true
    snackbarText.value = "Mật khẩu không hợp lệ!! Mật khẩu gồm 8 kí tự, ít nhất 1 chữ số và không có khoảng trắng"
    passwordInvalid.value = true
    return
  }

  login(form.email, form.password).then(res => {
    const response = res.data
    useToken.setToken(response.data.accessToken)
    userStore.setUser(response.data.user)

    router.push('/home')
  }).catch(err => {
    console.log(err);
    if (err.response.status == 401) {
      snackbar.value = true
      snackbarText.value = "Đăng nhập thất bại!! Vui lòng kiểm tra lại thông tin đăng nhập"
    } else if (err.response.status == 500) {
      snackbar.value = true
      snackbarText.value = "Server error!!!"
    }
  })
}

const navigateRegister = () => {
  router.push('/register')
}

const navigateForgetPassword = () => {
  router.push('/forget')
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

      <VCardText class="pt-2">
        <h5 class="text-h6 font-weight-semibold mb-1">
          Bắt đầu khám phá 🚀
        </h5>
        <p class="mb-0">
          Đăng nhập ngay
        </p>
      </VCardText>

      <VCardText>
        <VForm>
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField label="Email" type="email" v-model="form.email" :error="loginFailed || emailInvalid" @change="() => {
                loginFailed = false,
                  emailInvalid = false
              }" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="form.password" label="Mật khẩu" :type="isPasswordVisible ? 'text' : 'password'"
                :error="loginFailed || passwordInvalid" @change="() => {
                  loginFailed = false,
                    passwordInvalid = false
                }" :append-inner-icon="isPasswordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" />

            </VCol>
            <VCol cols="12">
              <!-- login button -->
              <VBtn class="mt-16" block @click="handleLogIn">
                Đăng nhập
              </VBtn>

              <VBtn class="mt-4" block @click="navigateRegister">
                Đăng ký tài khoản
              </VBtn>
              <VBtn class="mt-4" block @click="navigateForgetPassword">
                Quên mật khẩu
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
