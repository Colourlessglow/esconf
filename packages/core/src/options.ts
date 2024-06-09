import { defu } from 'defu'
import type { ESConfOptions, ResolveESConfOptions } from './types'

export const resolveOptions = <T>({
  presets,
  ...options
}: ESConfOptions<T>): ResolveESConfOptions<T> => {
  return defu(options, ...(presets || []).map((layers) => ({ layers })), {
    cwd: process.cwd(),
    layers: [],
  }) as any
}
