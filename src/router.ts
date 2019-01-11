import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/diary',
      name: 'diary',
      component: () => import('./views/diary/DiaryHome/DiaryHome.vue'),
    },
    {
      path: '/diary/writing',
      name: 'writing-diary',
      component: () => import('./views/diary/WritingDiary.vue'),
    },
    {
      path: '/diary/detail',
      name: 'diary-detail',
      component: () => import('./views/diary/DiaryDetail.vue'),
    },
    {
      path: '/ppt-test',
      name: 'ppt-test',
      component: () => import('../test-code/ppt-test.vue'),
    },
  ],
});
