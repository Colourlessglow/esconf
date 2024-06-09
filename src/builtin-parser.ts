import {
  type JSON5ParseOptions,
  type JSONCParseOptions,
  type JSONParseOptions,
  type YAMLParseOptions,
  parseJSON,
  parseJSON5,
  parseJSONC,
  parseTOML,
  parseYAML,
} from 'confbox'
import { interopDefault } from 'mlly'
import { tsImport } from './tsImport'
import type { BuiltinParsers, CustomParser, TsImportOptions } from './types'
import { defineParser } from './helper'

export const jsonParser = defineParser<JSONParseOptions>((option) => {
  return (code) => parseJSON(code, option)
})

export const jsoncParser = defineParser<JSONCParseOptions>((option) => {
  return (code) => parseJSONC(code, option)
})

export const json5Parser = defineParser<JSON5ParseOptions>((option) => {
  return (code) => parseJSON5(code, option)
})

export const yamlParser = defineParser<YAMLParseOptions>((option) => {
  return (code) => parseYAML(code, option)
})

export const tomlParser = defineParser(() => {
  return (code) => parseTOML(code)
})

export const tsParser = defineParser<TsImportOptions>((option) => {
  return async (_code, id) => {
    const config = await tsImport<any>(id, option)
    return interopDefault(config)
  }
})

export const jsParser = defineParser(() => {
  return async (_code, id) => {
    const config = await import(id)
    return interopDefault(config)
  }
})

export const getBuiltinParser = <T>() =>
  new Map<BuiltinParsers, CustomParser<T>>([
    ['json', jsonParser()],
    ['yaml', yamlParser()],
    ['toml', tomlParser()],
    ['jsonc', jsoncParser()],
    ['json5', json5Parser()],
    ['js', jsParser()],
    ['ts', tsParser()],
  ])
