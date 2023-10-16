<script setup>
import { useTheme } from 'vuetify'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import { useRouter } from 'vue-router'



const router = useRouter()


const form = ref({
  account: '',
  password: '',
})

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const login = () => {
  console.log(form._rawValue);
  loginFailed.value = true;
  //router.push('/dashboard')
}

const isPasswordVisible = ref(true)

const loginFailed = ref(false)

</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" min-width="400px">
      <VCardItem class="justify-center">
        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          MY STORE
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2 ">
        <p class="mb-4 text-center">
          Sản phẩm dành cho nhân viên
        </p>
      </VCardText>

      <VCardText>
        <VForm>
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField v-model="form.account" :error="loginFailed" @change="loginFailed = false" label="Mã nhân viên"
                type="email" :append-inner-icon="loginFailed ? 'mdi-close-outline' : ''" />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField v-model="form.password" label="Mật khẩu" :type="isPasswordVisible ? 'text' : 'password'"
                :error="loginFailed" @change="loginFailed = false"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible" />



              <!-- login button -->
              <VBtn class="mt-16" block @click="login">
                Login
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
