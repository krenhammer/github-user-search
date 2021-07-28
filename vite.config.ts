import { resolve } from 'path';
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],

  // From https://gist.github.com/alexanderniebuhr/12a60bde6faf44d4f519e93b1765ec99
  resolve: {
    alias: [
      {
        find: 'octokit/dist-node',
        replacement: 'octokit/dist-src',
      },
      {
        find: /@octokit\/(.+)\/dist-node/,
        replacement: '@octokit/$1/dist-src',
      },
      {
        find: 'bottleneck/light',
        replacement: 'bottleneck/lib',
      },
      {
        find: 'node-fetch',
        replacement: resolve('./node-fetch.js'),
      },
      {
        find: 'clean-stack',
        replacement: resolve('./clean-stack.js'),
      },
    ]
  },
  optimizeDeps: {
    exclude: [
      'octokit',
    ],
    include: [
      // 'once',
      // 'before-after-hook',
      // 'bottleneck/lib',
      // 'btoa-lite',
      // 'lru-cache',
      // 'aggregate-error',
      // 'fromentries',
    ]
  }
})
