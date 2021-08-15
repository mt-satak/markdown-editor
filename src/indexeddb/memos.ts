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