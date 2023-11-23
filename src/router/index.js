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
          meta: {
            title: 'Tài khoản',
          },
        },
        {
          path: 'favorite',
          component: () => import('../pages/favorite.vue'),
          meta: {
            title: 'Theo dõi',
          },
        },
        {
          path: 'upgrade',
          component: () => import('../pages/upgrade-account.vue'),
        },
        {
          path: 'manage-restaurant',
          component: () => import('../pages/restaurant-manage.vue'),
        },
        {
          path: 'manage-restaurant/brand',
          component: () => import('../pages/brand-change.vue'),
        },
        {
          path: 'manage-restaurant/create',
          component: () => import('../pages/restaurant-create.vue'),
        },
        {
          path: 'manage-restaurant/:restaurantId',
          component: () => import('../pages/restaurant-change.vue'),
        },
        {
          path: 'post',
          component: () => import('../pages/post.vue'),
        },
        {
          path: 'post/create/:restaurantId',
          component: () => import('../pages/post-create.vue'),
        },
        {
          path: 'post/:postId',
          component: () => import('../pages/post-update.vue'),
        }
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
