import { join } from 'pathe'
import { exists, isFile, readFile } from '@void-fs/kit'
import { defu } from 'defu'
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
  const files = findFiles(layer)
  return files.map((filepath) => parseFile(filepath, layer, cwd))
}

const mergeLayers = <T>(layers: LoadESConfResultLayer<T>[], option: ResolveESConfOptions<T>): T => {
  // @ts-expect-error
  return defu(...[...layers, { config: option.default }]).config
}

const excludeLayers = <T>(
  layers: ESConfLayer<T>[],
  excludeLayer: ESConfOptions<T>['excludeLayer']
) => {
  if (!excludeLayer) {
    return layers
  }
  if (typeof excludeLayer === 'function') {
    return layers.filter((layer) => !excludeLayer(layer))
  }
  return layers.filter((layer) => !(layer.name && excludeLayer.includes(layer.name)))
}

export const loadConfig = async <T>(option: ESConfOptions<T>): Promise<LoadESConfResult<T>> => {
  const _option = resolveOptions(option)
  const layers = await Promise.all(
    excludeLayers(_option.layers, _option.excludeLayer)
      .map((layer) => findlayer(layer, _option.cwd))
      .flat()
  )

  const config = mergeLayers(layers, _option)

  return {
    layers,
    config,
  }
}
