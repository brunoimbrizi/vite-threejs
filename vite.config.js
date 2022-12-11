import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: '8080'
  },
  publicDir: 'static',
  plugins: [ glsl() ],
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
});
