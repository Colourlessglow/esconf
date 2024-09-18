import { loadConfig } from './loadConfig'
import type { ESConfWatchOptions, ESConfWatchResult } from './types'

export const watchConfig = async <T>(
  option: ESConfWatchOptions<T>
): Promise<ESConfWatchResult<T>> => {
  let config = await loadConfig<T>(option)
  const watchingFiles = config.layers.map((item) => item.name)
  const { watch } = await import('chokidar')
  const watcher = watch(watchingFiles, {
    ignoreInitial: true,
    ignorePermissionErrors: true,
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
