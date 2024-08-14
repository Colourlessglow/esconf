import { defu } from 'defu'
import { JitiOptions, createJiti } from 'jiti'

/**
 * [`jiti`](https://github.com/unjs/jiti/blob/main/lib/types.d.ts#L38) 的配置
 */
export interface TsImportOptions extends JitiOptions {}

const DEFAULT_OPTIONS: JitiOptions = {
  interopDefault: true,
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
  const jiti = createJiti(filepath, defu(options, DEFAULT_OPTIONS))
  return jiti.import(filepath) as Promise<T>
}
