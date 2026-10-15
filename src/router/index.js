import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // hash 模式，适配 Gitee Pages 等静态托管（刷新不 404）
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/todo',
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/todo',
      name: 'Todo',
      component: () => import('@/views/todo/index.vue'),
    },
    {
      path: '/home',
      name: 'Layout',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '/icon',
          name: 'Icon',
          component: () => import('@/views/Icon.vue'),
        },
        {
          path: 'news',
          name: 'News',
          children: [
            {
              path: 'category',
              name: 'NewsCategory',
              component: () => import('@/views/news/NewsCategory.vue'),
            },
            {
              path: 'list',
              name: 'NewsList',
              component: () => import('@/views/news/NewsList.vue'),
            },
          ]
        },
        {
          path: 'user',
          name: 'User',
          children: [
            {
              path: 'list',
              name: 'UserList',
              component: () => import('@/views/users/UserList.vue'),
            },
          ]
        },
      ],
    },
  ],
})

export default router
