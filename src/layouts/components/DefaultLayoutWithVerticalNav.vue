<script setup>
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'

// Components
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'


const search = () => {
  alert('search')
}

</script>

<template>
  <VerticalNavLayout>

    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn class="ms-n3 d-lg-none btn-sider" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon size="32" icon="mdi-menu " />
        </IconBtn>
      </div>
    </template>

    <template #vertical-nav-content>
      <NavbarThemeSwitcher class="me-2" />
      <VerticalNavLink :item="{
        title: 'Trang chủ',
        icon: 'mdi-home-outline',
        to: '/home',
      }" />


      <!-- 👉 Pages -->
      <VerticalNavSectionTitle :item="{
        heading: 'Quản lý nhân sự',
      }" />
      <VerticalNavLink :item="{
        title: 'Nhân viên',
        icon: 'mdi-account-details',
        to: '/staff',
      }" />
      <VerticalNavLink :item="{
        title: 'Thêm nhân viên',
        icon: 'mdi-account-plus',
        to: '/add-staff',
      }" />
      <VerticalNavLink :item="{
        title: 'Phân quyền',
        icon: 'mdi-account-settings',
        to: '/roles',
      }" />
      <VerticalNavSectionTitle :item="{
        heading: 'Kho Hàng',
      }" />
      <VerticalNavSectionTitle :item="{
        heading: 'Đơn hàng',
      }" />
      <VerticalNavSectionTitle :item="{
        heading: 'Chăm sóc khách hàng',
      }" />
      <VerticalNavLink :item="{
        title: 'Login',
        icon: 'mdi-login',
        to: '/login',
      }" />
      <VerticalNavLink :item="{
        title: 'Register',
        icon: 'mdi-account-plus-outline',
        to: '/register',
      }" />
      <VerticalNavLink :item="{
        title: 'Error',
        icon: 'mdi-information-outline',
        to: '/no-existence',
      }" />

      <!-- 👉 User Interface -->
      <VerticalNavSectionTitle :item="{
        heading: 'User Interface',
      }" />
      <VerticalNavLink :item="{
        title: 'Typography',
        icon: 'mdi-alpha-t-box-outline',
        to: '/typography',
      }" />
      <VerticalNavLink :item="{
        title: 'Icons',
        icon: 'mdi-eye-outline',
        to: '/icons',
      }" />
      <VerticalNavLink :item="{
        title: 'Cards',
        icon: 'mdi-credit-card-outline',
        to: '/cards',
      }" />
      <VerticalNavLink :item="{
        title: 'Tables',
        icon: 'mdi-table',
        to: '/tables',
      }" />
      <VerticalNavLink :item="{
        title: 'Form Layouts',
        icon: 'mdi-form-select',
        to: '/form-layouts',
      }" />
    </template>

    <slot />
  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}

.btn-sider {
  height: 80%;
  width: 80%;
  margin: auto !important;
  background-color: #fff;
  border-radius: 8px;
  opacity: .8;
}
</style>
