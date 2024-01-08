<script setup>
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import { useUserStore } from '@/stores/user';
import { useTokenStore } from '@/stores/token';
import { Roles } from '@/helpers/roles'
import { getCountNotification } from '@/services/axios/api/api';
import { useNotificationStore } from '@/stores/notification'



const userStore = useUserStore()

let role = Roles.GUEST
if (userStore.user)
  role = userStore.user.role

console.log(role);
const notification = useNotificationStore()

getCountNotification().then(res => {
  notification.init(res.data.data.count)
}).catch(err => {
  console.log(err);
})

const listenerNoti = new EventSource(`http://localhost:3000/notification/sse?accessToken=${useTokenStore().accessToken}`)
listenerNoti.onmessage = mes => {
  notification.increaseCount()
  console.log(mes);
} 
</script>

<template>
  <VerticalNavLayout>

    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn class="ms-n3 d-lg-none btn-sider" @click="toggleVerticalOverlayNavActive(true)">
          <VIcon color="primary" size="32" icon="mdi-menu " />
        </IconBtn>
      </div>
    </template>

    <template #vertical-nav-content>




      <!-- 👉 Pages -->
      <VerticalNavSectionTitle v-if="role == Roles.OWNER || role == Roles.USER" :item="{
        heading: 'Tài Khoản',
      }" />
      <VerticalNavLink v-if="role == Roles.GUEST" :item="{
        title: 'Đăng nhập',
        icon: 'mdi-login',
        to: '/login',
      }" />
      <VerticalNavLink v-if="role !== Roles.GUEST" :item="{
        title: role == Roles.ADMIN ? 'Admin' : userStore.user.email,
        icon: 'mdi-account',
        to: '/account',
      }" />

      <VerticalNavLink v-if="role == Roles.OWNER || role == Roles.USER" :item="{
        title: 'Nhà hàng theo dõi',
        icon: 'mdi-book-heart-outline',
        to: '/favorite',
      }" />

      <VerticalNavLink v-if="role == Roles.USER" :item="{
        title: 'Nâng cấp ',
        icon: 'mdi-arrow-up-bold-outline',
        to: '/upgrade',
      }" />


      <!-- Restaurant-->
      <VerticalNavSectionTitle v-if="role == Roles.OWNER" :item="{
        heading: 'Quản lý cửa hàng',
      }" />

      <VerticalNavLink v-if="role == Roles.OWNER" :item="{
        title: 'Danh sách cửa hàng',
        icon: 'mdi-format-list-bulleted-square',
        to: '/owner/manage-restaurant',
      }" />
      <VerticalNavLink v-if="role == Roles.OWNER" :item="{
        title: 'Chờ phê duyệt',
        icon: 'mdi-format-list-bulleted-square',
        to: '/owner/consisder',
      }" />

      <VerticalNavLink v-if="role == Roles.OWNER" :item="{
        title: ' Post',
        icon: 'mdi-post',
        to: '/owner/post',
      }" />

      <!-- 👉 Admin -->
      <VerticalNavSectionTitle v-if="role == Roles.ADMIN" :item="{
        heading: 'Admin',
      }" />
      <VerticalNavLink v-if="role == Roles.ADMIN" :item="{
        title: 'Quản lý người dùng',
        icon: 'mdi-account',
        to: '/admin/user-manage',
      }" />
      <VerticalNavLink v-if="role == Roles.ADMIN" :item="{
        title: 'Quản lý cửa hàng',
        icon: 'mdi-home-edit',
        to: '/admin/restaurant-manage',
      }" />
      <VerticalNavLink v-if="role == Roles.ADMIN" :item="{
        title: 'Xét duyệt',
        icon: 'mdi-file-check',
        to: '/admin/forms',
      }" />

      <!--System-->
      <VerticalNavSectionTitle :item="{
        heading: 'Hệ thống',
      }" />
      <VerticalNavLink :item="{
        title: `Thông báo mới (${notification.count})`,
        icon: 'mdi-bell-badge-outline',
        color: 'error',
        to: '/notification',
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
