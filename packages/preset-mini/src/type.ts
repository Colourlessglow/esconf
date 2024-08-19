import type {
  JSON5ParseOptions,
  JSONCParseOptions,
  JSONParseOptions,
  YAMLParseOptions,
} from 'confbox'
import type { TsImportOptions } from './tsImport'

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
   * yaml 解析配置
   * 设置 false，则会跳过解析
   */
  yaml?: YAMLParseOptions | false
  /**
   * json 解析配置
   * 设置 false，则会跳过解析
   */
  json?: JSONParseOptions | false
  /**
   * jsonc 解析配置
   * 设置 false，则会跳过解析
   */
  jsonc?: JSONCParseOptions | false
  /**
   * json5 解析配置
   * 设置 false，则会跳过解析
   */
  json5?: JSON5ParseOptions | false
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
   * package.json 解析配置
   * 设置 false，则会跳过解析
   */
  'package.json'?: false

  /**
   * `.${name}rc` 文件解析
   * 基于 [rc9](https://github.com/unjs/rc9)
   * @default false
   */
  rcFile?: boolean
  /**
   * `${homedir}/.${name}rc` 文件解析
   * 基于 [rc9](https://github.com/unjs/rc9)
   * @default false
   */
  globalRc?: boolean
  /**
   * 是否在配置文件解析发生错误时抛出错误
   * @default false
   */
  throwOnError?: boolean
}
