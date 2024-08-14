import type { CustomCodeParser, CustomIdParser, CustomParser, ESConfLayer } from './types'

export const defineParser = <O>(o: <T>(o?: O) => CustomParser<T>) => o

export const defineCodeParser =
  <O>(o: <T>(o?: O) => CustomCodeParser<T>['parser']): (<T>(o?: O) => CustomCodeParser<T>) =>
  <T>(options) => {
    const parser = o<T>(options)
    return {
      type: 'code',
      parser,
    }
  }

export const defineIdParser =
  <O>(o: <T>(o?: O) => CustomIdParser<T>['parser']): (<T>(o?: O) => CustomIdParser<T>) =>
  <T>(options) => {
    const parser = o<T>(options)
    return {
      type: 'id',
      parser,
    }
  }

export const defineLayer = <O>(o: <T>(o: O) => ESConfLayer<T>) => o
