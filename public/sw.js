const VERSION = '1.0.0'
const CACHE_NAME = 'tracker-app-' + VERSION
const CACHE_FILES = [
  '../index.html',
  '/offline.html',
  '/favicon.ico',
  '/manifest.json',
]

const self = this
self.addEventListener('install', (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      await cache.addAll(CACHE_FILES)
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('/offline.html'))
    }),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys()
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name)
          }
        }),
      )
      await clients.claim()
    })(),
  )
})
