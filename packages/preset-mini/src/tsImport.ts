import { defu } from 'defu'
import { type JitiOptions } from 'jiti/native'
import { nativeImport } from './nativeImport'

/**
 * [`jiti`](https://github.com/unjs/jiti/blob/main/lib/types.d.ts#L38) 的配置
 */
export interface TsImportOptions extends JitiOptions {}

const DEFAULT_OPTIONS: JitiOptions = {
  moduleCache: false,
  extensions: ['.js', '.ts', '.mjs', '.cjs', '.mts', '.cts', '.json'],
}

const jitiImport = async <T>(filepath: string, options?: TsImportOptions): Promise<T> => {
  let createJiti: (typeof import('jiti'))['createJiti']
  try {
    createJiti = (await import('jiti')).createJiti
  } catch (e) {
    throw new Error(
      '[esconf] 当前 node 版本不支持原生解析 ts，或原生解析失败（如使用了 enum 等语法）：' +
        '请安装可选依赖 jiti（如 pnpm add -D jiti）',
      { cause: e }
    )
  }
  const jiti = createJiti(filepath, defu(options, DEFAULT_OPTIONS))
  return (await jiti.import(filepath, { default: true })) as Promise<T>
}

/**
 * ecmascript/typescript 模块导入
 * node 支持原生解析 ts（v22.18+/v23.6+，详见 `process.features.typescript`）时优先使用原生导入，
 * 原生导入报错（如使用了 enum 等不支持的语法）或不支持原生解析时降级为 jiti
 * @param filepath 模块路径
 * @param options `jiti`(https://github.com/unjs/jiti/blob/main/lib/types.d.ts#L38) 的配置，仅在降级到 jiti 时生效
 * @returns 模块的默认导出
 */
export const tsImport = async <T>(filepath: string, options?: TsImportOptions): Promise<T> => {
  if (!process.features.typescript) {
    return jitiImport<T>(filepath, options)
  }
  try {
    return await nativeImport<T>(filepath)
  } catch {
    return jitiImport<T>(filepath, options)
  }
}
