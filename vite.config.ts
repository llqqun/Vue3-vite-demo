/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { join } from 'path';
import AutoImport from 'unplugin-auto-import/vite'; // 自定义引入文件
import Components from 'unplugin-vue-components/vite'; // 自动引入组件
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'serve') {
    console.log('开发环境');
  } else {
    console.log('生产环境');
  }
  const option = {
    test: {
      globals: true,
      environment: 'jsdom',
    },
    resolve: {
      alias: [
        {
          find: /@/,
          replacement: join(__dirname, 'src'),
        },
      ],
    },
    plugins: [
      vue(),
      Components({
        dts: true,
        dirs: ['src/components'], //用于搜索组件的目录的相对路径
        extensions: ['vue'],
        resolvers: [ElementPlusResolver()],
      }),
      AutoImport({
        // dirs: ['./src/components'], 自定义自动导入.ts
        dts: true, // 生成.d.ts文件
        vueTemplate: false, // 生成vue模板声明
        imports: ['vue'], // 全局导入
        resolvers: [ElementPlusResolver()],
        eslintrc: {
          enabled: true,
        },
      }),
    ],
    server: {
      host: true,
      open: true,
      port: 8080,
      proxy: {
        // '/api': 'http://lyxzbk.hn-xinhua.cn'
        '^/dev/.*': {
          target: 'http://lyxzbk.hn-xinhua.cn',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev/, ''),
        },
      },
    },
  };
  return option;
});
