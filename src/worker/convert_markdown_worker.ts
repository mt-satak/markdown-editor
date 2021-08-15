import * as marked from 'marked'
import * as sanitizeHtml from 'sanitize-html'

const worker: Worker = self as any // selfを一旦any型と定義して型チェックを回避する

worker.addEventListener('message', (event) => {
  const text = event.data
  // ※ XSS対策: HTMLは無害化してからメインスレッドに渡す
  const html = sanitizeHtml(
    // テキストをHTMLに変換
    marked(text),
    { allowedTags: [...sanitizeHtml.defaults.allowedTags, 'h1', 'h2'] }
  )
  worker.postMessage({ html })
})