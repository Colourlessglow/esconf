import { defu } from 'defu'
import { createJiti } from 'jiti'
import { type JitiOptions } from 'jiti/native'

/**
 * [`jiti`](https://github.com/unjs/jiti/blob/main/lib/types.d.ts#L38) 的配置
 */
export interface TsImportOptions extends JitiOptions {}

const DEFAULT_OPTIONS: JitiOptions = {
  moduleCache: false,
  extensions: ['.js', '.ts', '.mjs', '.cjs', '.mts', '.cts', '.json'],
}

/**
 * ecmascript/typescript 模块导入
 * @param fileName 模块路径
 * @param options [`jiti`](https://github.com/unjs/jiti/blob/main/lib/types.d.ts#L38) 的配置
 * @returns
 */
export const tsImport = async <T>(filepath: string, options?: TsImportOptions): Promise<T> => {
  const o = defu(options, DEFAULT_OPTIONS)
  const jiti = createJiti(filepath, o)
  return jiti.import(filepath, { default: true }) as Promise<T>
}
