import { join } from 'node:path'
import { expect, test } from 'vitest'
import { loadConfig } from '../src'
import { packageJsonLayer } from '../src/presets'

test('load config file', async () => {
  const config = await loadConfig({
    layers: [
      {
        files: ['vrx.config'],
        extensions: ['mts', 'ts'],
        parser: 'ts',
      },
      {
        files: ['vrx.config'],
        extensions: ['js', 'mjs'],
        parser: 'js',
      },
      {
        files: ['vrx'],
        extensions: ['yaml', 'yml'],
        parser: 'yaml',
      },
      {
        files: ['vrx'],
        extensions: ['toml'],
        parser: 'toml',
      },
    ],
    cwd: join(import.meta.dirname, 'configs'),
    default: { defaultValue: 'value' },
  })
  expect(config.config).toEqual({ type: 'mts', defaultValue: 'value' })
  expect(config.layers).toEqual([
    { name: 'vrx.config.mts', config: { type: 'mts' } },
    { name: 'vrx.config.ts', config: { type: 'ts' } },
    { name: 'vrx.config.js', config: { type: 'js' } },
    { name: 'vrx.config.mjs', config: { type: 'mjs' } },
    { name: 'vrx.yaml', config: { type: 'yaml' } },
    { name: 'vrx.yml', config: { type: 'yml' } },
    { name: 'vrx.toml', config: { type: 'toml' } },
  ])
})

test('load config form package.json', async () => {
  const config = await loadConfig({
    layers: [packageJsonLayer({ configKey: 'author' })],
  })
  expect(config.config).toEqual({ name: 'whitekite', email: '1075790909@qq.com' })
  expect(config.layers).toEqual([
    { name: 'package.json', config: { name: 'whitekite', email: '1075790909@qq.com' } },
  ])
})
