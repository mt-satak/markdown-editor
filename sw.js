const CacheName = 'Cache:v1'

// self: サービスワーカー自身
self.addEventListener('install', (event) => {
  console.log('Service Worker install: ', event)
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activate: ', event)
})

const networkFallingBackToCache = async (request) => {
  const cache = await caches.open(CacheName)
  try {
    const response = await fetch(request)
    // レスポンスの内部で一度しか読み取りできない処理があるためコピーしてから保存する必要がある
    await cache.put(request, response.clone())
    return response
  } catch (e) {
    console.error(e)
    return cache.match(request)
  }
}

// リソース取得処理(fetch)に処理を挟む
self.addEventListener('fetch', (event) => {
  // 非同期処理の実行終了を待ってからネットワークエラー時の処理を行う
  event.respondWith(networkFallingBackToCache(event.request))
})