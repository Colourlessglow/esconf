import { defineCodeParser, defineIdParser } from '@esconf/core'
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
import { readPackageJSON } from 'pkg-types'
import { TsImportOptions, tsImport } from './tsImport'

export const jsonParser = defineCodeParser<JSONParseOptions>((option) => {
  return (code) => parseJSON(code, option)
})

export const jsoncParser = defineCodeParser<JSONCParseOptions>((option) => {
  return (code) => parseJSONC(code, option)
})

export const json5Parser = defineCodeParser<JSON5ParseOptions>((option) => {
  return (code) => parseJSON5(code, option)
})

export const yamlParser = defineCodeParser<YAMLParseOptions>((option) => {
  return (code) => parseYAML(code, option)
})

export const tomlParser = defineCodeParser(() => {
  return (code) => parseTOML(code)
})

export const tsParser = defineIdParser<TsImportOptions>((option) => {
  return (id) => tsImport<any>(id, option)
})

export const packageJsonParser = defineIdParser<string>((name) => {
  return async () => {
    const pkg = await readPackageJSON()
    return pkg[name!]
  }
})

export { tsParser as jsParser }
