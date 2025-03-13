import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/album/:id',
    name: 'album-detail',
    component: () => import('@/views/AlbumDetail.vue'),
  },
  {
    path: '/albums',
    name: 'albums',
    component: () => import('@/views/Albums.vue'),
  },
  {
    path: '/singles',
    name: 'singles',
    component: () => import('@/views/Singles.vue'),
  },
  {
    path: '/single/:id',
    name: 'single-detail',
    component: () => import('@/views/SingleDetail.vue'),
  },
  {
    path: "/single/:id/version/:versionId",
    name: 'version-detail',
    component: () => import('@/views/VersionDetail.vue'),
  },
  {
    path: '/other-tracks',
    name: 'other-tracks',
    component: () => import('@/views/OtherTracks.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
