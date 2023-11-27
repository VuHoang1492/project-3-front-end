<script setup>
import { useTheme } from 'vuetify'


const form = ref({
  email: '',
  privacyPolicies: false,
})

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
            <VTextField v-model="form.email" label="Email" type="email" />
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

            <VBtn block type="submit" to="/">
              Đăng Ký
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
</template>

<style lang="scss">
@use "@core/scss/pages/page-auth.scss";
</style>
