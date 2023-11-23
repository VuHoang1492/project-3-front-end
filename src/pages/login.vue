<script setup>
import { useTheme } from 'vuetify'
import { useRouter } from 'vue-router'



const router = useRouter()


const form = ref({
  email: '',
  password: '',
})

const vuetifyTheme = useTheme()



const login = () => {
  console.log(form._rawValue);
  // loginFailed.value = true;
  router.push('/home')
}

const navigateRegister = () => {
  router.push('/register')
}

const isPasswordVisible = ref(true)

const loginFailed = ref(false)

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
              <VTextField v-model="form.email" :error="loginFailed" @change="loginFailed = false" label="Email"
                type="email" :append-inner-icon="loginFailed ? 'mdi-close-outline' : ''" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="form.password" label="Mật khẩu" :type="isPasswordVisible ? 'text' : 'password'"
                :error="loginFailed" @change="loginFailed = false"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" />

            </VCol>
            <VCol cols="12">
              <!-- login button -->
              <VBtn class="mt-16" block @click="login">
                Đăng nhập
              </VBtn>

              <VBtn class="mt-4" block @click="navigateRegister">
                Đăng ký tài khoản
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <!-- bg img -->
    <VImg class="auth-footer-mask d-none d-md-block" :src="authThemeMask" />
  </div>
</template>

<style lang="scss" scoped>
@use "@core/scss/pages/page-auth.scss";
</style>
