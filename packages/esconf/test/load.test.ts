import { join } from 'node:path'
import { expect, test } from 'vitest'
import { loadConfig } from '../src'
import { presetMini } from '../src/preset-mini'

test('load config from preset-mini', async () => {
  const config = await loadConfig({
    presets: [presetMini({ name: 'vrx', configName: 'config', 'package.json': false })],
    cwd: join(import.meta.dirname, 'configs'),
    default: { defaultValue: 'value' },
  })
  expect(config.config).toEqual({ type: 'mts', defaultValue: 'value' })
  expect(config.layers).toEqual([
    { name: 'vrx.config.mts', config: { type: 'mts' } },
    { name: 'vrx.config.ts', config: { type: 'ts' } },
    { name: 'vrx.config.mjs', config: { type: 'mjs' } },
    { name: 'vrx.config.js', config: { type: 'js' } },
    { name: 'vrx.toml', config: { type: 'toml' } },
    { name: 'vrx.yaml', config: { type: 'yaml' } },
    { name: 'vrx.yml', config: { type: 'yml' } },
    { name: 'vrx.jsonc', config: { type: 'jsonc' } },
    { name: 'vrx.json5', config: { type: 'json5' } },
    { name: 'vrx.json', config: { type: 'json' } },
  ])
})

test('load config from preset-mini with excludeLayer function', async () => {
  const config = await loadConfig({
    presets: [presetMini({ name: 'author' })],
    excludeLayer(layer) {
      return !layer.name?.endsWith('package.json')
    },
  })
  expect(config.config).toEqual({ name: 'whitekite', email: '1075790909@qq.com' })
  expect(config.layers).toEqual([
    { name: 'package.json', config: { name: 'whitekite', email: '1075790909@qq.com' } },
  ])
})

test('load config from preset-mini with excludeLayer', async () => {
  const config = await loadConfig({
    presets: [presetMini({ name: 'author' })],
    excludeLayer: ['ts', 'js', 'toml', 'yaml', 'yml', 'jsonc', 'json5', 'json'].map(
      (item) => `preset-mini:${item}`
    ),
  })
  expect(config.config).toEqual({ name: 'whitekite', email: '1075790909@qq.com' })
  expect(config.layers).toEqual([
    { name: 'package.json', config: { name: 'whitekite', email: '1075790909@qq.com' } },
  ])
})
