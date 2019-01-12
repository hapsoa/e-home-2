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
  {
    path: '/test-move-file',
    name: 'test-move-file',
    component: () => import('@/../test-code/test-move-file/test-move-file.vue'),
  },
];
