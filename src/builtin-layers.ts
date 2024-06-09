import { readPackageJSON } from 'pkg-types'
import type { CustomParser, ESConfLayer, TsImportOptions } from './types'
import { getBuiltinParser, tsParser } from './builtin-parser'
import { defineLayer } from './helper'

export const baseLayer = <T>(
  option: ESConfLayer<T>
): Omit<ESConfLayer<T>, 'parser'> & { parser: CustomParser<T> } => {
  if (typeof option.parser === 'string') {
    const builtinParser = getBuiltinParser<T>()
    if (!builtinParser.has(option.parser)) {
      throw new Error(`未找到内置 parser: [${option.parser}]`)
    }
    return {
      ...option,
      parser: builtinParser.get(option.parser)!,
    }
  }
  return option as any
}

export interface PackageJsonLayerOption {
  configKey: string
  throwOnError?: boolean
}

export const packageJsonLayer = defineLayer<PackageJsonLayerOption>((option) => ({
  files: ['package'],
  extensions: ['json'],
  parser: async () => {
    const pkg = await readPackageJSON()
    return pkg[option.configKey]
  },
  throwOnError: option.throwOnError,
}))

export interface TsLayerOption extends Omit<ESConfLayer<any>, 'parser' | 'extensions'> {
  importXOption?: TsImportOptions
  extensions?: string[]
}

export const tsLayer = defineLayer<TsLayerOption>((option) => ({
  extensions: ['mts', 'ts'],
  ...option,
  parser: tsParser(option.importXOption),
}))

export const jsLayer = defineLayer<TsLayerOption>((option) => ({
  extensions: ['js', 'mjs'],
  ...option,
  parser: 'js',
}))

export interface YamlLayerOption extends Omit<ESConfLayer<any>, 'parser' | 'extensions'> {}

export const yamlLayer = defineLayer<YamlLayerOption>((option) => ({
  extensions: ['yaml', 'yml'],
  ...option,
  parser: 'yaml',
}))
