import { defu } from 'defu'
import type { ESConfOptions, ResolveESConfOptions } from './types'

export const resolveOptions = <T>(options: ESConfOptions<T>): ResolveESConfOptions<T> => {
  return defu(options, {
    cwd: process.cwd(),
    layers: [],
  }) as any
}
