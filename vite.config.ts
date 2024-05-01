import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';

export default defineConfig({
    base: '/',
    mode: 'production',
    plugins: [
        react(),
        chunkSplitPlugin()
    ],

    build: {
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
                entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
                assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
            }
        }
    },
    esbuild: {
        pure: ['console.log'],
    }
});
