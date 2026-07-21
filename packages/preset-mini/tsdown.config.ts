import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts', 'src/parser.ts'],
  target: 'node20',
  dts: true,
  clean: true,
  platform: 'node',
  shims: true,
  publint: true,
  unused: true,
  deps: {
    skipNodeModulesBundle: true,
  },
  exports: true,
  fixedExtension: false,
})
