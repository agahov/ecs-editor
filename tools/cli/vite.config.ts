import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/cli.ts'),
      name: 'cli',
      formats: ['es'],
      fileName: 'cli',
    },
    rollupOptions: {
      external: ['commander', 'inquirer'],
      output: {
        format: 'es',
        banner: '#!/usr/bin/env node',
      },
    },
    target: 'node18',
    ssr: true,
  },
  resolve: {
    conditions: ['node', 'default'],
  },
});

