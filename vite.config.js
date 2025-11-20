import { defineConfig } from 'vite';

import { version } from './package.json';

export default defineConfig({
  server: {
    port: '8080'
  },
  define: {
    APP_VERSION: JSON.stringify(version),
  },
});
