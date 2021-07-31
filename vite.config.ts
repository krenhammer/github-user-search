import { resolve } from 'path';
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    VitePWA({
      registerType: 'autoUpdate',  
      includeAssets: [
        '/src/favicon.svg', 
      ],
      // filename: 'serviceWorker.ts',
      base: '/',
      // strategies: 'injectManifest',
      srcDir: 'src',
      manifest: {
        name: 'Github User Search',
        short_name: 'PWA Inject',
        theme_color: '#000000',
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: '/src/favicon.svg', // <== don't remove slash, for testing purposes
            sizes: '192x192',
            type: 'image/svg',
          },
          {
            src: '/src/favicon.svg', // <== don't remove slash, for testing purposes
            sizes: '512x512',
            type: 'image/svg',
          },
          {
            src: '/src/favicon.svg', // <== don't remove slash, for testing purposes
            sizes: '512x512',
            type: 'image/svg',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ["https://avatars.githubusercontent.com/u/*"]
        // workbox options for generateSW
      }
    })
  ],
  build: {
    terserOptions: {
      compress: {
        passes: 3
      }
    },
  },

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
