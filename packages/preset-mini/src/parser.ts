import { defineCodeParser, defineIdParser } from '@esconf/core'
import { TsImportOptions, tsImport } from './tsImport'
import type { JSONParseOptions } from './type'

export const jsonParser = defineCodeParser<JSONParseOptions>((option) => {
  return (code) => JSON.parse(code, option?.reviver)
})

export const tsParser = defineIdParser<TsImportOptions>((option) => {
  return (id) => tsImport<any>(id, option)
})

export { tsParser as jsParser }
