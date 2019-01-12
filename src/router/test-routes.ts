export default [
  {
    path: '/ppt-test',
    name: 'ppt-test',
    component: () => import('@/../test-code/ppt-test.vue'),
  },
  {
    path: '/text-editor',
    name: 'text-editor',
    component: () => import('@/components/TextEditor/TextEditor.vue'),
  },
];
