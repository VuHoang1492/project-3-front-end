import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'home',
          component: () => import('../pages/map.vue'),
          meta: {
            title: 'Trang Chủ',
          },
        },
        {
          path: 'account',
          component: () => import('../pages/profile.vue'),
        },
        {
          path: 'add-staff',
          component: () => import('../pages/add-staff-page.vue'),
        },
        {
          path: 'staff-profile/:id',
          component: () => import('../pages/staff-profile-page.vue'),
        },
        {
          path: 'roles',
          component: () => import('../pages/roles-page.vue'),
        },
        {
          path: 'roles/:id',
          component: () => import('../pages/role-info-page.vue'),
        },
        {
          path: 'icons',
          component: () => import('../pages/icons.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
          meta: {
            title: 'Đăng nhập',
          },
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
          meta: {
            title: 'Đăng ký',
          },
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from) => {

  document.title = to.meta?.title ?? 'Default   '
})

export default router
