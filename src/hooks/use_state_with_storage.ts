import { useState } from 'react'

/**
 * カスタムフック  
 * useStateから取得した入力値とlocalstorageへの保存関数を返却する
 * 
 * @param {string} init 
 * @param {string} key 
 * @returns
 */
export const useStateWithStorage = (init: string, key: string): [string, (s: string) => void] => {
  const [value, setValue] = useState<string>(localStorage.getItem(key) || init)

  const setValueWithStorage = (nextValue: string): void => {
    setValue(nextValue)
    localStorage.setItem(key, nextValue)
  }

  return [value, setValueWithStorage]
}