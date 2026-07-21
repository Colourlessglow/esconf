import { defineCodeParser, defineIdParser } from '@esconf/core'
import { jsonParser, jsParser, tsParser } from '@esconf/preset-mini'
import {
  type JSON5ParseOptions,
  type JSONCParseOptions,
  type YAMLParseOptions,
  parseJSON5,
  parseJSONC,
  parseTOML,
  parseYAML,
} from 'confbox'
import { read, readUser } from 'rc9'
import { readPackageJSON } from 'pkg-types'

export { jsonParser, jsParser, tsParser }

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

export const packageJsonParser = defineIdParser<string>((name) => {
  return async () => {
    const pkg = await readPackageJSON()
    return pkg[name!]
  }
})

export const rcFileParser = defineIdParser<string>((name) => {
  return () => read<any>({ name: `.${name}rc`, flat: false })
})

export const globalRcFileParser = defineIdParser<string>((name) => {
  return () => readUser<any>({ name: `.${name}rc`, flat: false })
})
