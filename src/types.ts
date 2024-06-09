import type { ImportxOptions } from 'importx'

/**
 * [`importx`](https://github.com/antfu/importx/blob/main/src/types.ts) 的配置
 */
export interface TsImportOptions extends Omit<ImportxOptions, 'parentURL'> {}

export type BuiltinParsers = 'json' | 'yaml' | 'toml' | 'jsonc' | 'json5' | 'js' | 'ts'

export type CustomParser<T> = (code: string, id: string) => Promise<T | undefined> | T | undefined

/**
 * 配置文件解析规则配置
 */
export interface ESConfLayer<T> {
  /**
   * 配置文件文件名称
   */
  files: string[]
  /**
   * 配置文件匹配文件后缀名
   */
  extensions: string[]
  /**
   * 配置文件解析规则
   */
  parser: BuiltinParsers | CustomParser<T>
  /**
   * 是否在配置文件解析发生错误时抛出错误
   * @default false
   */
  throwOnError?: boolean
}

export interface ESConfOptions<T> {
  /**
   * 配置文件解析规则配置
   */
  layers: ESConfLayer<T>[]
  /**
   * 解析配置文件根文件夹
   * @default process.cwd()
   */
  cwd?: string
  /**
   * 默认数据
   */
  default?: T
}

/**
 * @inner
 */
export interface ResolveESConfOptions<T> extends Required<Omit<ESConfOptions<T>, 'default'>> {
  /**
   * 默认数据
   */
  default?: T
}

/**
 * 解析的配置文件数据
 */
export interface LoadESConfResultLayer<T> {
  /**
   * 解析到配置文件的路径
   */
  name: string
  /**
   * 解析到的模块数据
   */
  config?: T
}

/**
 * 配置导入结果
 */
export interface LoadESConfResult<T> {
  /**
   * 合并配置文件结果
   */
  config: T
  /**
   * 所有解析的配置文件数据
   */
  layers: LoadESConfResultLayer<T>[]
}
