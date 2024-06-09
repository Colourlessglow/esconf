import type { SupportedLoader } from 'importx'
import { readPackageJSON } from 'pkg-types'
import { defu } from 'defu'
import type { TsImportOptions } from './types'

/**
 * ecmascript/typescript 模块导入
 * @param fileName 模块路径
 * @param options [`importx`](https://github.com/antfu/importx/blob/main/src/types.ts) 的配置
 * @returns
 */
export const tsImport = async <T>(filepath: string, options?: TsImportOptions): Promise<T> => {
  const pkg = await readPackageJSON()
  const isPureESM = pkg.type === 'module'
  const excludeLoaders: SupportedLoader[] = [isPureESM ? 'jiti' : 'tsx']
  return import('importx').then((x) => {
    return x.import(
      filepath,
      defu(options, {
        parentURL: filepath,
        cache: false,
        excludeLoaders,
        listDependencies: true,
      })
    )
  })
}
