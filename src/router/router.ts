import Vue from 'vue';
import Router from 'vue-router';
import _ from 'lodash';
import testRoutes from '@/router/test-routes';
import Home from '@/views/Home.vue';

Vue.use(Router);

let routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  // {
  //   path: '/memo',
  //   name: 'memo',
  //   component: () => import('./views/memo/MemoHome.vue'),
  // },
  // {
  //   path: '/memo/making',
  //   name: 'making-memo',
  //   component: () => import('./views/memo/MakingMemo.vue'),
  // },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/diary',
    name: 'diary',
    component: () => import('@/views/diary/DiaryHome/DiaryHome.vue'),
  },
  {
    path: '/diary/writing',
    name: 'writing-diary',
    component: () => import('@/views/diary/WritingDiary.vue'),
  },
  {
    path: '/diary/detail',
    name: 'diary-detail',
    component: () => import('@/views/diary/DiaryDetail.vue'),
  },
];

routes = _.concat(routes, testRoutes as []);
console.log('routes', routes);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
