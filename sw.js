// self: サービスワーカー自身
self.addEventListener('install', (event) => {
  console.log('Service Worker install: ', event)
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activate: ', event)
})

// リソース取得処理(fetch)に処理を挟む
self.addEventListener('fetch', (event) => {
  console.log('Fetch to:', event.request.url)
  // 非同期処理の実行終了を待ってからfetchする
  event.respondWith(fetch(event.request))
})