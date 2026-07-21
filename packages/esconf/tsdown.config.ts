import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'preset-mini': 'src/preset-mini.ts',
    'preset-full': 'src/preset-full.ts',
    'preset-mini/parser': 'src/preset-mini-parser.ts',
    'preset-full/parser': 'src/preset-full-parser.ts',
  },
  target: 'node20',
  dts: true,
  clean: true,
  platform: 'node',
  shims: true,
  publint: true,
  unused: true,
  exports: true,
  fixedExtension: false,
  deps: {
    skipNodeModulesBundle: true,
  },
})
