import { defineConfig } from 'vite';
import viteSingleFile from 'vite-plugin-singlefile';

// 产物为单个自包含 index.html：ES module 在 file:// 下会被 CORS 拦截，
// 双击离线使用必须把 JS/CSS 全部内联，仅设 base: './' 不够。
export default defineConfig({
  base: './',
  plugins: [viteSingleFile()],
});
