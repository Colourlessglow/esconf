import type { ESConfLayer, Preset } from '@esconf/core'
import { jsonParser, jsParser, tsParser } from './parser'
import type { TsImportOptions } from './tsImport'
import type { JSONParseOptions, PresetMiniOption } from './type'

export * from './parser'

export const presetMini = <T>(options: PresetMiniOption): Preset<T> => {
  const configFile = [options.name, options.configName].filter(Boolean).join('.')
  const layers = new Map<string, ESConfLayer<T>>([
    [
      'ts',
      {
        files: [configFile],
        extensions: ['mts', 'ts', 'cts'],
        parser: tsParser(options.ts as TsImportOptions),
      },
    ],
    ['js', { files: [configFile], extensions: ['mjs', 'js', 'cjs'], parser: jsParser() }],
    [
      'json',
      {
        files: [options.name],
        extensions: ['json'],
        parser: jsonParser(options.json as JSONParseOptions),
      },
    ],
  ])

  layers.forEach((value, key) => {
    if (options[key] === false) {
      layers.delete(key)
      return
    }
    layers.set(key, { name: `preset-mini:${key}`, ...value, throwOnError: options.throwOnError })
  })
  return [...layers.values()]
}
