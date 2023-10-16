<script setup>
import avatar1 from '@images/avatars/avatar-1.png'

const accountData = {
  avatarImg: avatar1,
  firstName: 'john',
  lastName: 'Doe',
  email: 'johnDoe@example.com',
  org: 'ThemeSelection',
  phone: '+1 (917) 543-9876',
  address: '123 Main St, New York, NY 10001',
  state: 'New York',
  zip: '10001',
  country: 'USA',
  language: 'English',
  timezone: '(GMT-11:00) International Date Line West',
  currency: 'USD',
}

const refInputEl = ref()
const accountDataLocal = ref(structuredClone(accountData))
const isAccountDeactivated = ref(false)


const changeAvatar = file => {
  const fileReader = new FileReader()
  const { files } = file.target
  if (files && files.length) {
    fileReader.readAsDataURL(files[0])
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string')
        accountDataLocal.value.avatarImg = fileReader.result
    }
  }
}



</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="THÊM NHÂN VIÊN">
        <VCardText class="d-flex">
          <!-- 👉 Avatar -->
          <VAvatar rounded="lg" size="100" class="me-6" :image="accountDataLocal.avatarImg" />

          <!-- 👉 Upload Photo -->
          <form class="d-flex flex-column justify-center gap-5">
            <div class="d-flex flex-wrap gap-2">
              <VBtn color="primary" @click="refInputEl?.click()">
                <VIcon icon="mdi-cloud-upload-outline" class="d-sm-none" />
                <span class="d-none d-sm-block">TẢI ẢNH LÊN</span>
              </VBtn>

              <input ref="refInputEl" type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden @input="changeAvatar">

              <!-- <VBtn type="reset" color="error" variant="tonal" @click="resetAvatar">
                <span class="d-none d-sm-block">Reset</span>
                <VIcon icon="mdi-refresh" class="d-sm-none" />
              </VBtn> -->
            </div>

            <p class="text-body-1 mb-0">
              ẢNH SỬ DỤNG ĐỂ CHẤM CÔNG
            </p>
          </form>
        </VCardText>

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6">
            <VRow>
              <!-- 👉 First Name -->
              <VCol cols="12">
                <VTextField v-model="accountDataLocal.firstName" label="Họ và tên" />
              </VCol>


              <!-- 👉 Organization -->
              <VCol cols="12">
                <VTextField v-model="accountDataLocal.org" label="Địa chỉ" />
              </VCol>

              <!-- 👉 Phone -->
              <VCol cols="12">
                <VTextField v-model="accountDataLocal.phone" label="Số điện thoại" />
              </VCol>

              <!-- 👉 State -->
              <VCol cols="12">
                <VTextField v-model="accountDataLocal.state" label="CCCD/CMND" />
              </VCol>

              <VCol cols="12">
                <VTextField v-model="accountDataLocal.state" label="Ngày sinh" type="date" />
              </VCol>

              <VCol cols="12">
                <VCombobox v-model="accountDataLocal.state"
                  :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" label="Vị trí" />
              </VCol>



              <!-- 👉 Form Actions -->

              <VCol cols="12" class="d-flex flex-column gap-4">
                <div>
                  <VCheckbox v-model="isAccountDeactivated" label="Xác nhận thêm nhân viên" />
                </div>
                <VBtn class="w-25" :disabled="!isAccountDeactivated">Thêm nhân viên</VBtn>

                <!-- <VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm">
                  Reset
                </VBtn> -->
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">
      <!-- 👉 Deactivate Account -->
      <VCard title="Deactivate Account">
        <VCardText>
          <div>
            <VCheckbox v-model="isAccountDeactivated" label="I confirm my account deactivation" />
          </div>

          <VBtn :disabled="!isAccountDeactivated" color="error" class="mt-3">
            Deactivate Account
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
