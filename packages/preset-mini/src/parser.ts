import { defineCodeParser, defineIdParser } from '@esconf/core'
import { type JSONParseOptions, parseJSON } from 'confbox'
import { TsImportOptions, tsImport } from './tsImport'

export const jsonParser = defineCodeParser<JSONParseOptions>((option) => {
  return (code) => parseJSON(code, option)
})

export const tsParser = defineIdParser<TsImportOptions>((option) => {
  return (id) => tsImport<any>(id, option)
})

export { tsParser as jsParser }
