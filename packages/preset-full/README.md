# @esconf/preset-full

`esconf` 的全量预设

内置解析器一览

- `.mts` `.ts` `.cts` `.mjs` `.js` `.cjs` `.json` 复用 [`@esconf/preset-mini`](https://npmjs.com/package/@esconf/preset-mini) 的解析器
- `.jsonc` `.json5` `.yaml` `.yml` `.toml` 基于 [confbox](https://github.com/unjs/confbox) 导入
- `.${name}rc` `${homedir}/.${name}rc` 基于 [rc9](https://github.com/unjs/rc9) 导入
- `package.json` 基于 [pkg-types](https://github.com/unjs/pkg-types) 导入

> 注意： 预设 js，ts 解析只包含 es module 的解析

> 只需要项目级 `json`、`js`、`ts` 配置文件时，可以使用更轻量的最小预设 [`@esconf/preset-mini`](https://npmjs.com/package/@esconf/preset-mini)

## 安装

```sh
# ✨ Auto-detect
npx nypm install @esconf/preset-full

# npm
npm install @esconf/preset-full

# yarn
yarn add @esconf/preset-full

# pnpm
pnpm add @esconf/preset-full

# bun
bun install @esconf/preset-full

# deno
deno install npm:@esconf/preset-full
```

## 简单使用

```ts
import { loadConfig } from '@esconf/core'
import { presetFull } from '@esconf/preset-full'
import { tsParser } from '@esconf/preset-full/parser'

const config = await loadConfig({
  presets: [
    presetFull({
      // 配置如下会解析 vite.config.{cts,ts,mts} vite.{toml,....}
      name: 'vite',
      configName: 'config',
      // 设置 ts 文件解析规则
      ts: {
        fsCache: false,
      },
      // 关闭js 文件解析
      js: false,
      // ....
    }),
  ],
  // 数组越靠前配置文件的优先级越高
  // layers 的优先级比 presets 高
  layers: [
    {
      // load from vrx.config.{mts,ts}
      files: ['vrx.config'],
      extensions: ['mts', 'ts'],
      parser: tsParser(),
    },
  ],
  // 配置默认值
  default: { defaultValue: 'value' },
  cwd: process.cwd(),
  // 如果某个 layer 命名了，可以用 layer 的名称在运行时排除
  excludeLayer: ['preset-full:toml'],
  // 如果 excludeLayer 的 类型时 funcition ,则可以根据 layer 配置的特征自行决定运行时是否排除
  excludeLayer: (layer) => layer.extensions.includes('yaml'),
})
```

## 鸣谢

- [antfu/unconfig](https://github.com/antfu/unconfig)
