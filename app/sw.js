// 자동 생성 파일 (vite.web.config.ts)
const CACHE = 'schedule-memo-munr9uf4'
const FILES = ["./","./index-U2Xa5Kjt.css","./index-Cu8qd0I5.js","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./apple-touch-icon.png"]
const INDEX = new URL('./', self.location).href

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return
  if (e.request.mode === 'navigate') {
    // 화면은 새 버전을 먼저 받아 보고, 오프라인이면 저장해 둔 화면을 씁니다.
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put(INDEX, copy))
          return res
        })
        .catch(() => caches.match(INDEX))
    )
    return
  }
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)))
})
