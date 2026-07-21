# esconf

配置文件加载工具

API 设计参考自 [antfu/unconfig](https://github.com/antfu/unconfig)

`esconf` 在使用时更像 [`unocss`](https://unocss.dev/) 需要 core + presets 形式组合

`esconf/preset-mini` 最小预设，仅加载项目级 `json`、`js`、`ts` 配置文件

- `.mts` `.ts` `.cts` `.mjs` `.js` `.cjs` 基于 [jiti@2](https://unjs.io/packages/jiti) 导入
- `.json` 基于 [confbox](https://github.com/unjs/confbox) 导入

`esconf/preset-full` 全量预设，在最小预设基础上额外支持

- `.jsonc` `.json5` `.yaml` `.yml` `.toml` 基于 [confbox](https://github.com/unjs/confbox) 导入
- `.${name}rc` `${homedir}/.${name}rc` 基于 [rc9](https://github.com/unjs/rc9) 导入
- `package.json` 基于 [pkg-types](https://github.com/unjs/pkg-types) 导入

> 注意： 预设 js，ts 解析只包含 es module 的解析

<!-- automd:badges color="orange" license licenseBranch  bundlephobia packagephobia  -->

[![npm version](https://img.shields.io/npm/v/esconf?color=orange)](https://npmjs.com/package/esconf)
[![npm downloads](https://img.shields.io/npm/dm/esconf?color=orange)](https://npm.chart.dev/esconf)
[![bundle size](https://img.shields.io/bundlephobia/minzip/esconf?color=orange)](https://bundlephobia.com/package/esconf)
[![install size](https://badgen.net/packagephobia/install/esconf?color=orange)](https://packagephobia.com/result?p=esconf)
[![license](https://img.shields.io/github/license/Colourlessglow/esconf?color=orange)](https://github.com/Colourlessglow/esconf/blob/true/LICENSE)

<!-- /automd -->

## 安装

<!-- automd:pm-install  -->

```sh
# ✨ Auto-detect
npx nypm install esconf

# npm
npm install esconf

# yarn
yarn add esconf

# pnpm
pnpm add esconf

# bun
bun install esconf

# deno
deno install npm:esconf
```

<!-- /automd -->

## 简单使用

```ts
import { loadConfig, presetFull } from 'esconf'
import { tsParser } from 'esconf/preset-full'

const config = await loadConfig({
  presets: [
    presetFull({
      // 配置如下会解析 vite.config.{cts,ts,mts} vite.{toml,....}
      name: 'vite',
      configName: 'config',
      // 设置 ts 文件解析规则
      ts: {
        loader: 'tsx',
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

<!-- /automd -->

## 鸣谢

- [antfu/unconfig](https://github.com/antfu/unconfig)

## 贡献者

<!-- automd:contributors author="Colourlessglow" license="MIT" -->

Published under the [MIT](https://github.com/Colourlessglow/esconf/blob/main/LICENSE) license.
Made by [@Colourlessglow](https://github.com/Colourlessglow) and [community](https://github.com/Colourlessglow/esconf/graphs/contributors) 💛
<br><br>
<a href="https://github.com/Colourlessglow/esconf/graphs/contributors">
<img src="https://contrib.rocks/image?repo=Colourlessglow/esconf" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->
