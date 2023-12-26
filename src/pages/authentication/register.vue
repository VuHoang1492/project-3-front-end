<script setup>
import { validateEmail } from '@/helpers/validate';
import { register } from '@/services/axios/api/api'
import { useRouter } from 'vue-router';

const router = useRouter()

let emailInvalid = ref(false)
let snackbar = ref(false)
let snackbarText = ref('')

const form = reactive({
  email: '',
  privacyPolicies: false,
})


const handleRegister = () => {

  if (!validateEmail(form.email)) {
    snackbar.value = true
    snackbarText.value = "Email  không hợp lện!!!"
    emailInvalid.value = true
    return
  }
  register(form.email).then(res => {
    console.log(res);
    if (res.status === 200) {
      snackbar.value = true
      snackbarText.value = "Thư xác nhận đã gửi tới hòm thư. Vui lòng kiểm tra mail!!"
    }
  }).catch(err => {
    if (err.response.status === 400) {
      snackbar.value = true
      snackbarText.value = "Email không hợp lệ hoặc đã được sử dụng!!"
      emailInvalid.value = true

    } else {
      snackbar.value = true
      snackbarText.value = "Server error !!!"
    }
  })
}

</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">

        <VCardTitle class="font-weight-semibold text-2xl text-uppercase">
          MAP FOOD
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h6 font-weight-semibold mb-1  ">
          Đăng ký ngay 🚀
        </h5>
      </VCardText>
      <VCardText>
        <VRow>
          <!-- email -->
          <VCol cols="12">
            <VTextField v-model="form.email" label="Email" :error="emailInvalid" type="email" />
          </VCol>

          <!-- password -->
          <VCol cols="12">

            <div class="d-flex align-center mt-1 mb-4">
              <VCheckbox id="privacy-policy" v-model="form.privacyPolicies" inline />
              <VLabel for="privacy-policy" style="opacity: 1;">
                <span class="me-1">I agree to</span>
                <a href="javascript:void(0)" class="text-primary">privacy policy & terms</a>
              </VLabel>
            </div>

            <VBtn block @click="handleRegister" :disabled="!form.privacyPolicies">
              Đăng Ký
            </VBtn>
            <VBtn class="mt-4" block @click="() => { router.push('/home') }">
              Đến trang chủ
            </VBtn>
          </VCol>

          <!-- login instead -->
          <VCol cols="12" class="text-center text-base">
            <span>Đã có tài khoản?</span>
            <RouterLink class="text-primary ms-2" to="login">
              Đăng nhập ngay
            </RouterLink>
          </VCol>
        </VRow>

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

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
