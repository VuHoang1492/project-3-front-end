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
          component: () => import('../pages/user/profile.vue'),
          meta: {
            title: 'Tài khoản',
          },
        },
        {
          path: 'favorite',
          component: () => import('../pages/user/favorite.vue'),
          meta: {
            title: 'Theo dõi',
          },
        },
        {
          path: 'upgrade',
          component: () => import('../pages/user/upgrade-account.vue'),
        },
        //restaurant
        {
          path: 'manage-restaurant',
          component: () => import('../pages/restaurant/restaurant-manage.vue'),
        },
        {
          path: 'manage-restaurant/brand',
          component: () => import('../pages/restaurant/brand-change.vue'),
        },
        {
          path: 'manage-restaurant/create',
          component: () => import('../pages/restaurant/restaurant-create.vue'),
        },
        {
          path: 'manage-restaurant/:restaurantId',
          component: () => import('../pages/restaurant/restaurant-change.vue'),
        },
        {
          path: 'post',
          component: () => import('../pages/restaurant/post.vue'),
        },
        {
          path: 'post/create/:restaurantId',
          component: () => import('../pages/restaurant/post-create.vue'),
        },
        {
          path: 'post/:postId',
          component: () => import('../pages/restaurant/post-update.vue'),
        },
        {
          path: 'review/create/:restaurantId',
          component: () => import('../pages/restaurant/review-create.vue'),
        },
        {
          path: 'consisder',
          component: () => import('../pages/restaurant/consisder.vue'),
        },
        //Admin
        {
          path: 'admin/user-manage',
          component: () => import('../pages/admin/admin-user/user-manage.vue'),
        },
        {
          path: 'admin/restaurant-manage',
          component: () => import('../pages/admin/admin-restaurant/restaurant-manage.vue'),
        },
        {
          path: 'admin/forms',
          component: () => import('../pages/admin/admin-form/form-manage.vue'),
        },
        {
          path: 'admin/forms/:formId/restaurant',
          component: () => import('../pages/admin/admin-form/restaurant-form.vue'),
        },
        {
          path: 'admin/forms/:formId/report',
          component: () => import('../pages/admin/admin-user/report-form.vue'),
        }
        ,
        {
          path: 'notification',
          component: () => import('../pages/notification.vue'),
        }
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/authentication/login.vue'),
          meta: {
            title: 'Đăng nhập',
          },
        },
        {
          path: 'register',
          component: () => import('../pages/authentication/register.vue'),
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
