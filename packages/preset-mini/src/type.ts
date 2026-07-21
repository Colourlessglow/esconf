import type { TsImportOptions } from './tsImport'

/**
 * json 解析配置
 */
export interface JSONParseOptions {
  /**
   * 一个转换结果的函数，会为对象的每个成员调用此函数
   */
  reviver?: (this: any, key: string, value: any) => any
}

/**
 * 最小预设选项
 */
export interface PresetMiniOption {
  /**
   * 寻找配置文件的文件名
   */
  name: string
  /**
   * js/ts 查找配置文件是否需要的后缀
   */
  configName?: string
  /**
   * json 解析配置
   * 设置 false，则会跳过解析
   */
  json?: JSONParseOptions | false
  /**
   * ts 解析配置
   * 设置 false，则会跳过解析
   */
  ts?: TsImportOptions | false
  /**
   * js 解析配置
   * 设置 false，则会跳过解析
   */
  js?: false
  /**
   * 是否在配置文件解析发生错误时抛出错误
   * @default false
   */
  throwOnError?: boolean
}
