import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router';

export const menus: Array<RouteRecordRaw> = [
  {
    path: 'home',
    name: 'home',
    component: () => import('@/views/home.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: 'demo',
    name: 'demo',
    component: () => import('@/views/demo.vue'),
    meta: {
      title: '视频图片截图',
    },
  },
  {
    path: 'study',
    name: 'study',
    component: () => import('@/views/study.vue'),
    meta: {
      title: '学习',
    },
  },
  {
    path: 'test',
    name: 'Test',
    component: () => import('@/views/test.vue'),
    meta: {
      title: '测试',
    },
  },
];

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/views/layout.vue'),
    children: menus,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
