import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src'],
  target: 'node18',
  dts: true,
  clean: true,
  format: ['cjs', 'esm'],
  treeshake: true,
  splitting: true,
  platform: 'node',
  shims: true,
})
