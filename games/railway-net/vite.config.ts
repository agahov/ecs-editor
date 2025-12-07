import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      '@ecs-editor/ecs-core': resolve(__dirname, '../../packages/ecs-core/src/index.ts'),
      '@ecs-editor/aspects-core': resolve(__dirname, '../../packages/aspects-core/src/index.ts'),
      '@ecs-editor/canvas-runtime': resolve(__dirname, '../../packages/canvas-runtime/src/index.ts'),
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
  },
});

