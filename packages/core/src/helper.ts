import type { CustomParser, ESConfLayer } from './types'

export const defineParser = <O>(o: <T>(o?: O) => CustomParser<T>) => o

export const defineLayer = <O>(o: <T>(o: O) => ESConfLayer<T>) => o
