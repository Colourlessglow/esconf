import type { ESConfLayer, Preset } from '@esconf/core'
import { readPackageJSON } from 'pkg-types'
import type {
  JSON5ParseOptions,
  JSONCParseOptions,
  JSONParseOptions,
  YAMLParseOptions,
} from 'confbox'
import {
  jsParser,
  json5Parser,
  jsonParser,
  jsoncParser,
  tomlParser,
  tsParser,
  yamlParser,
} from './parser'
import type { PresetMiniOption } from './type'
import type { TsImportOptions } from './tsImport'

export * from './parser'

export const presetMini = <T>(option: PresetMiniOption): Preset<T> => {
  const configFile = [option.name, option.configName].filter(Boolean).join('.')
  const layers = new Map<string, ESConfLayer<T>>([
    [
      'ts',
      {
        files: [configFile],
        extensions: ['mts', 'ts'],
        parser: tsParser(option.ts as TsImportOptions),
      },
    ],
    ['js', { files: [configFile], extensions: ['mjs', 'js'], parser: jsParser() }],
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
      'package.json',
      {
        files: ['package'],
        extensions: ['json'],
        parser: async () => {
          const pkg = await readPackageJSON()
          return pkg[option.name]
        },
      },
    ],
  ])

  layers.forEach((value, key) => {
    if (option[key] === false) {
      layers.delete(key)
      return
    }
    layers.set(key, { name: `preset-mini:${key}`, ...value })
  })
  return [...layers.values()]
}
