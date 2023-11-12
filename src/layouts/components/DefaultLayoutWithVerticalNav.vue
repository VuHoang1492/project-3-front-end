<script setup>
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'





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

      <!-- <VerticalNavLink :item="{
        title: 'Trang chủ',
        icon: 'mdi-home-outline',
        to: '/home',
      }" /> -->


      <!-- 👉 Pages -->
      <VerticalNavSectionTitle :item="{
        heading: 'Tài Khoản',
      }" />
      <VerticalNavLink :item="{
        title: 'Đăng nhập',
        icon: 'mdi-login',
        to: '/login',
      }" />
      <VerticalNavLink :item="{
        title: 'Example@gmail.com',
        icon: 'mdi-account',
        to: '/account',
      }" />

      <VerticalNavLink :item="{
        title: 'Nhà hàng theo dõi',
        icon: 'mdi-book-heart-outline',
        to: '/profile',
      }" />

      <VerticalNavLink :item="{
        title: 'Nâng cấp ',
        icon: 'mdi-arrow-up-bold-outline',
        to: '/profile',
      }" />

      <VerticalNavSectionTitle :item="{
        heading: 'Quản lý cửa hàng',
      }" />

      <VerticalNavLink :item="{
        title: 'Danh sách cửa hàng',
        icon: 'mdi-format-list-bulleted-square',
        to: '/login',
      }" />
      <VerticalNavLink :item="{
        title: 'Thêm cửa hàng',
        icon: 'mdi-store-plus',
        to: '/register',
      }" />
      <VerticalNavLink :item="{
        title: 'Đăng Post',
        icon: 'mdi-tray-arrow-up',
        to: '/no-existence',
      }" />

      <!-- 👉 User Interface -->
      <VerticalNavSectionTitle :item="{
        heading: 'Admin',
      }" />
      <VerticalNavLink :item="{
        title: 'Khóa người dùng',
        icon: 'mdi-account-cancel',
        to: '/typography',
      }" />
      <VerticalNavLink :item="{
        title: 'Xét duyệt nâng cấp',
        icon: 'mdi-eye-outline',
        to: '/icons',
      }" />
      <VerticalNavLink :item="{
        title: 'Xét duyệt nhà hàng  ',
        icon: 'mdi-credit-card-outline',
        to: '/cards',
      }" />
      <!-- <VerticalNavLink :item="{
        title: 'Tables',
        icon: 'mdi-table',
        to: '/tables',
      }" />
      <VerticalNavLink :item="{
        title: 'Form Layouts',
        icon: 'mdi-form-select',
        to: '/form-layouts',
      }" /> -->
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
