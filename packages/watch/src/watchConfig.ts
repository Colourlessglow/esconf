import { dirname, resolve } from 'node:path'
import { loadConfig } from '@esconf/core'
import type { ChokidarOptions } from 'chokidar'
import type { ESConfOptions, LoadESConfResult } from '@esconf/core'

export interface ESConfWatchOptions<T> extends ESConfOptions<T> {
  chokidarOptions?: ChokidarOptions
  /**
   * 监听更改防抖
   * @default 100
   */
  debounce?: number | false
  /**
   * config 修改事件
   * @param result
   */
  onChange?: (newConfig: LoadESConfResult<T>, oldConfig: LoadESConfResult<T>) => any
}

export interface ESConfWatchResult<T> extends LoadESConfResult<T> {
  unwatch: () => void
}

export const watchConfig = async <T>(
  option: ESConfWatchOptions<T>
): Promise<ESConfWatchResult<T>> => {
  let config = await loadConfig<T>(option)
  const cwd = option.cwd ?? process.cwd()
  // chokidar 监听大量不存在的文件时会为每个文件建立独立的 watcher，可能丢失新建文件事件，
  // 改为监听候选文件的父目录，并通过 ignored 过滤出候选文件
  const watchingDirs = new Set<string>()
  const candidateFiles = new Set<string>()
  for (const item of config.layers) {
    const filepath = resolve(cwd, item.name)
    candidateFiles.add(filepath)
    watchingDirs.add(dirname(filepath))
  }
  const { watch } = await import('chokidar')
  const watcher = watch([...watchingDirs], {
    ignoreInitial: true,
    ignorePermissionErrors: true,
    depth: 0,
    ignored: (path, stats) => {
      const filepath = resolve(cwd, path)
      return (
        !watchingDirs.has(filepath) &&
        !candidateFiles.has(filepath) &&
        (stats ? stats.isFile() : true)
      )
    },
    cwd: option.cwd,
    ...option.chokidarOptions,
  })

  const onChange = async () => {
    const oldConfig = config
    const newConfig = await loadConfig<T>(option)
    config = newConfig
    if (option.onChange) {
      await option.onChange(newConfig, oldConfig)
    }
    config = newConfig
  }

  if (option.debounce === false) {
    watcher.on('all', onChange)
  } else {
    const { debounce } = await import('perfect-debounce')
    watcher.on('all', debounce(onChange, option.debounce ?? 100, { leading: true }))
  }

  const result: Partial<ESConfWatchResult<T>> = {
    unwatch: () => {
      watcher.close()
    },
  }

  return new Proxy<ESConfWatchResult<T>>(result as ESConfWatchResult<T>, {
    get(t, p, r) {
      if (Reflect.has(t, p)) {
        return Reflect.get(t, p, r)
      }
      return config[p]
    },
  })
}
