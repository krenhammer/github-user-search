import { precacheAndRoute } from 'workbox-precaching'

declare let self: (ServiceWorkerGlobalScope & Window & any) 

self.addEventListener('message', (event: MessageEvent) => {
  if (event.data && event.data.type === 'SKIP_WAITING')
    self.skipWaiting()
})
// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)