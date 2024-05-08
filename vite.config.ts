import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import compressionPlugin from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

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
            plugins: [
                visualizer({
                    open: true, // 直接在浏览器中打开分析报告
                    filename: 'stats.html', // 输出文件的名称
                    gzipSize: true, // 显示gzip后的大小
                    brotliSize: true, // 显示brotli压缩后的大小
                })
            ],
            output: {
                chunkFileNames: 'vendor/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js',
                assetFileNames: '[ext]/[name]-[hash].[ext]',
                manualChunks: {
                    'react-vendor': ['react', 'react-dom'],
                    'lodash': ['lodash-es'],
                    'library': ['antd', '@arco-design/web-react'],
                },
            },
        }
    },
});
