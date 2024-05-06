import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import compressionPlugin from 'vite-plugin-compression';

export default defineConfig({
    base: '/',
    mode: 'production',
    plugins: [
        react(),
        chunkSplitPlugin(),
        compressionPlugin()
    ],

    build: {
        cssCodeSplit: true,
        terserOptions: {
            compress: {
                drop_console: true, // 生产环境下去除console
                drop_debugger: true, // 生产环境下去除debugger
            }
        },
        assetsDir: 'assets', // 指定生成静态资源的存放路径,相对于outDir
        assetsInlineLimit: 4096,// 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。
        sourcemap: false, // 是否生成map文件
        reportCompressedSize: true, //  gzip 压缩大小报告。
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
                entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
                assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
                manualChunks: {
                    'react-dom': ['react-dom'],
                },
            },
        }
    },
});
