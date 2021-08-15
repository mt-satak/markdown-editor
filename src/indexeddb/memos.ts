import Dexie from 'dexie'

// テーブルのカラムとその型をインターフェースで指定
export interface MemoRecord {
  datetime: string
  title: string
  text: string
}

// コンストラクタ引数でDB名を指定
const database = new Dexie('markdown-editor')
// DBのバージョン指定・使用するテーブルとインデックスとなるデータ名を指定
database.version(1).stores({ memos: '&datetime' })
// memosテーブルに対応するORM的なオブジェクトを取得
const memos: Dexie.Table<MemoRecord, string> = database.table('memos')

/**
 * 引数で受け取ったタイトルとテキストを使用してメモをindexedDBに保存する
 * 
 * @param {string} title 
 * @param {string} text 
 */
export const putMemo = async (title: string, text: string): Promise<void> => {
  const datetime = new Date().toISOString()
  await memos.put({ datetime, title, text })
}

const NUM_PER_PAGE: number = 10

/**
 * 履歴ページのページ総件数を計算し、結果を返却する
 * 
 * @returns {Promise<number>} pageCount
 */
export const getMemoPageCount = async (): Promise<number> => {
  const totalCount = await memos.count()
  const pageCount = Math.ceil(totalCount / NUM_PER_PAGE)

  return pageCount > 0 ? pageCount : 1
}

/**
 * indexedDBからテキスト履歴をリストで取得し結果を配列形式で返却する
 * 返却するリストの仕様は下記の通り
 * - 日付の降順(新しい順)
 * - リストの取得開始位置から10件
 * 
 * @returns {Array}
 */
export const getMemos = (page: number): Promise<MemoRecord[]> => {
  const offset = (page - 1) * NUM_PER_PAGE
  return memos.orderBy('datetime')
    .reverse()
    .offset(offset)
    .limit(NUM_PER_PAGE)
    .toArray()
}