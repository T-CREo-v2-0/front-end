import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// const root = resolve(__dirname, 'src')
// const outDir = resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  // root,
  plugins: [react()],
  // build: {
  //   outDir,
  //   emptyOutDir: true,
  //   rollupOptions: {
  //     input: {
  //       main: resolve(root, 'index.html'),
  //       options: resolve(root, 'options', 'options.html'),
  //     },
  //   },
  // },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        options: resolve(__dirname, 'options.html'),
      },
    },
  },
})
