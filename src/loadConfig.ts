import { join } from 'pathe'
import { exists, isFile, readFile } from '@void-fs/kit'
import { defu } from 'defu'
import { baseLayer } from './builtin-layers'
import { resolveOptions } from './options'
import type {
  CustomParser,
  ESConfLayer,
  ESConfOptions,
  LoadESConfResult,
  LoadESConfResultLayer,
  ResolveESConfOptions,
} from './types'

const findFiles = <T>(layer: ESConfLayer<T>) => {
  const files: string[] = []
  for (const file of layer.files) {
    for (const ext of layer.extensions) {
      files.push(ext ? `${file}.${ext}` : file)
    }
  }
  return files
}

const parseFile = async <T>(
  filepath: string,
  layer: ESConfLayer<T>,
  cwd: string
): Promise<LoadESConfResultLayer<T>> => {
  try {
    if ((await exists(filepath, { cwd })) && (await isFile(filepath, { cwd }))) {
      const code = await readFile(filepath, { cwd })
      const config = await Promise.resolve(
        (layer.parser as CustomParser<T>)(code, join(cwd, filepath))
      )
      return {
        name: filepath,
        config,
      }
    }
    return {
      name: filepath,
      config: void 0,
    }
  } catch (e) {
    if (layer.throwOnError) {
      throw e
    }
    return {
      name: filepath,
      config: void 0,
    }
  }
}

const findlayer = <T>(layer: ESConfLayer<T>, cwd: string) => {
  const _layer = baseLayer<T>(layer)

  const files = findFiles(_layer)
  return files.map((filepath) => parseFile(filepath, _layer, cwd))
}

const mergeLayers = <T>(layers: LoadESConfResultLayer<T>[], option: ResolveESConfOptions<T>): T => {
  // @ts-expect-error
  return defu(...[...layers, { config: option.default }]).config
}

export const loadConfig = async <T>(option: ESConfOptions<T>): Promise<LoadESConfResult<T>> => {
  const _option = resolveOptions(option)
  const layers = await Promise.all(
    option.layers.map((layer) => findlayer(layer, _option.cwd)).flat()
  )
  const config = mergeLayers(layers, _option)

  return {
    layers,
    config,
  }
}
