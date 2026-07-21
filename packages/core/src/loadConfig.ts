import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { createConfigCoreLoader } from 'unconfig-core'
import { normalize } from 'pathe'
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

/**
 * 将 esconf 的解析规则转换为 unconfig-core 的解析函数
 * 解析结果为假值时遵循 unconfig-core 的语义，视为未解析到配置
 */
const wrapParser = <T>(layerParser: CustomParser<T>) => {
  if (typeof layerParser === 'function' || layerParser.type === 'id') {
    const parser = typeof layerParser === 'function' ? layerParser : layerParser.parser
    return (filepath: string) => parser(normalize(filepath))
  }
  return async (filepath: string) => {
    const code = await readFile(filepath, 'utf8')
    return layerParser.parser(code, normalize(filepath))
  }
}

const findLayer = async <T>(
  layer: ESConfLayer<T>,
  cwd: string
): Promise<LoadESConfResultLayer<T>[]> => {
  const parent = dirname(cwd)
  const loader = createConfigCoreLoader<T>({
    cwd,
    // unconfig-core 默认向上级目录查找，通过 stopAt 限制只在 cwd 内查找
    // cwd 为根目录时 dirname(cwd) === cwd，此时使用空字符串保证根目录也能被查找
    stopAt: parent === cwd ? '' : parent,
    multiple: true,
    sources: [
      {
        files: layer.files,
        extensions: layer.extensions,
        parser: wrapParser(layer.parser),
        skipOnError: !layer.throwOnError,
      },
    ],
  })
  const found = await loader.load()
  const configMap = new Map(found.map((item) => [normalize(item.source), item.config]))
  return findFiles(layer).map((filepath) => ({
    name: filepath,
    config: configMap.get(normalize(resolve(cwd, filepath))),
  }))
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
  const layers = (
    await Promise.all(
      excludeLayers(_option.layers, _option.excludeLayer).map((layer) =>
        findLayer(layer, _option.cwd)
      )
    )
  ).flat()

  const config = mergeLayers(layers, _option)

  return {
    layers,
    config,
  }
}
