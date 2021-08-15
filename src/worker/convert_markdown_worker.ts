import * as marked from 'marked'

const worker: Worker = self as any // selfを一旦any型と定義して型チェックを回避する

worker.addEventListener('message', (event) => {
  const text = event.data
  const html = marked(text)
  worker.postMessage({ html })
})