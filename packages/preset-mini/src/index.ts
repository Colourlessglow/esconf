import { join } from 'node:path'
import { homedir } from 'node:os'
import type { ESConfLayer, Preset } from '@esconf/core'
import type {
  JSON5ParseOptions,
  JSONCParseOptions,
  JSONParseOptions,
  YAMLParseOptions,
} from 'confbox'
import {
  globalRcFileParser,
  jsParser,
  json5Parser,
  jsonParser,
  jsoncParser,
  packageJsonParser,
  rcFileParser,
  tomlParser,
  tsParser,
  yamlParser,
} from './parser'
import type { TsImportOptions } from './tsImport'
import type { PresetMiniOption } from './type'

export * from './parser'

export const presetMini = <T>(options: PresetMiniOption): Preset<T> => {
  const option: PresetMiniOption = {
    rcFile: false,
    globalRc: false,
    ...options,
  }
  const configFile = [option.name, option.configName].filter(Boolean).join('.')
  const layers = new Map<string, ESConfLayer<T>>([
    [
      'ts',
      {
        files: [configFile],
        extensions: ['mts', 'ts', 'cts'],
        parser: tsParser(option.ts as TsImportOptions),
      },
    ],
    ['js', { files: [configFile], extensions: ['mjs', 'js', 'cjs'], parser: jsParser() }],
    ['toml', { files: [option.name], extensions: ['toml'], parser: tomlParser() }],
    [
      'yaml',
      {
        files: [option.name],
        extensions: ['yaml', 'yml'],
        parser: yamlParser(option.yaml as YAMLParseOptions),
      },
    ],
    [
      'jsonc',
      {
        files: [option.name],
        extensions: ['jsonc'],
        parser: jsoncParser(option.jsonc as JSONCParseOptions),
      },
    ],
    [
      'json5',
      {
        files: [option.name],
        extensions: ['json5'],
        parser: json5Parser(option.json5 as JSON5ParseOptions),
      },
    ],
    [
      'json',
      {
        files: [option.name],
        extensions: ['json'],
        parser: jsonParser(option.json as JSONParseOptions),
      },
    ],
    [
      'rcFile',
      {
        files: [`.${option.name}rc`],
        extensions: [''],
        parser: rcFileParser(option.name),
      },
    ],
    [
      'package.json',
      {
        files: ['package'],
        extensions: ['json'],
        parser: packageJsonParser(option.name),
      },
    ],
    [
      'globalRc',
      {
        files: [join(homedir(), `.${option.name}rc`)],
        extensions: [''],
        parser: globalRcFileParser(option.name),
      },
    ],
  ])

  layers.forEach((value, key) => {
    if (option[key] === false) {
      layers.delete(key)
      return
    }
    layers.set(key, { name: `preset-mini:${key}`, ...value, throwOnError: option.throwOnError })
  })
  return [...layers.values()]
}
