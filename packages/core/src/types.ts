/**
 * 基于文件路径解析
 */
export type CustomFallbackParser<T> = (id: string) => Promise<T | undefined> | T | undefined
/**
 * 基于文件文本解析
 */
export interface CustomCodeParser<T> {
  type: 'code'
  parser: (code: string, id: string) => Promise<T | undefined> | T | undefined
}

/**
 * 基于文件路径解析
 */
export interface CustomIdParser<T> {
  type: 'id'
  parser: (id: string) => Promise<T | undefined> | T | undefined
}

/**
 * 自定义文件解析
 */
export type CustomParser<T> = CustomCodeParser<T> | CustomIdParser<T> | CustomFallbackParser<T>

/**
 * 配置文件解析规则配置
 */
export interface ESConfLayer<T> {
  name?: string
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
  parser: CustomParser<T>
  /**
   * 是否在配置文件解析发生错误时抛出错误
   * @default false
   */
  throwOnError?: boolean
}

export type Preset<T> = ESConfLayer<T>[]

export interface ESConfOptions<T> {
  /**
   * 一个 layer 预设
   */
  presets?: Preset<T>[]
  /**
   * 配置文件解析规则配置
   */
  layers?: ESConfLayer<T>[]
  /**
   * 解析配置文件根文件夹
   * @default process.cwd()
   */
  cwd?: string
  /**
   * 默认数据
   */
  default?: T
  /**
   * 排除某些 layer
   */
  excludeLayer?: string[] | ((layer: ESConfLayer<T>) => boolean)
}

/**
 * @inner
 */
export interface ResolveESConfOptions<T>
  extends Required<Omit<ESConfOptions<T>, 'default' | 'presets' | 'layers'>> {
  /**
   * 默认数据
   */
  default?: T
  layers: ESConfLayer<T>[]
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
