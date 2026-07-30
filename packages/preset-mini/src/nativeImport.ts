import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'

let count = 0

/**
 * 使用 node 原生能力导入模块
 * 通过 url query 与清除 cjs 缓存，保证重复导入时能获取最新内容（对齐 jiti 的 moduleCache: false）
 * @param filepath 模块路径
 * @returns 模块的默认导出
 */
export const nativeImport = async <T>(filepath: string): Promise<T> => {
  try {
    // cjs/cts 模块经 fileURLToPath 进入 require 缓存（query 会被丢弃），需要手动清除
    const req = createRequire(filepath)
    delete req.cache[req.resolve(filepath)]
  } catch {
    // 文件不存在或不在 require 缓存中时忽略，后续 import 会抛出对应错误
  }
  const url = pathToFileURL(filepath)
  url.search = `t=${Date.now()}_${count++}`
  const mod = await import(url.href)
  return (mod.default ?? mod) as T
}
