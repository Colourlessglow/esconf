# @esconf/preset-mini

`esconf` 的最小预设

内置解析器一览
- `.mts` `.ts` 基于 [importx](https://github.com/antfu/importx) 导入
- `.mjs` `.js`  基于 原生 `import('id')` 导入
- `.json` `.jsonc` `.json5` `.yaml` `.yml` `.toml` 基于 [confbox](https://github.com/unjs/confbox) 导入

> 注意： 预设 js，ts 解析只包含 es module 的解析


<!-- automd:badges color="orange" license licenseBranch  bundlephobia packagephobia  -->

[![npm version](https://img.shields.io/npm/v/@esconf/preset-mini?color=orange)](https://npmjs.com/package/@esconf/preset-mini)
[![npm downloads](https://img.shields.io/npm/dm/@esconf/preset-mini?color=orange)](https://npmjs.com/package/@esconf/preset-mini)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@esconf/preset-mini?color=orange)](https://bundlephobia.com/package/@esconf/preset-mini)
[![license](https://img.shields.io/github/license/Colourlessglow/esconf?color=orange)](https://github.com/Colourlessglow/esconf/blob/true/LICENSE)

<!-- /automd -->


## 安装

<!-- automd:pm-install  -->

```sh
# ✨ Auto-detect
npx nypm install @esconf/preset-mini

# npm
npm install @esconf/preset-mini

# yarn
yarn add @esconf/preset-mini

# pnpm
pnpm install @esconf/preset-mini

# bun
bun install @esconf/preset-mini
```

<!-- /automd -->

## 简单使用

```ts
import { loadConfig } from '@esconf/core'
import { presetMini , tsParser } from '@esconf/preset-mini'

const config = await loadConfig({
    presets:[
      presetMini({
        // 配置如下会解析 vite.config.{mjs,js,ts,mts} vite.{toml,....}
        name:'vite',
        configName:'config',
        // 设置 ts 文件解析规则
        ts:{
          loader:'tsx'
        },
        // 关闭js 文件解析
        js: false,
        // ....
      })
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
    excludeLayer: ['preset-mini:toml'],
    // 如果 excludeLayer 的 类型时 funcition ,则可以根据 layer 配置的特征自行决定运行时是否排除
    excludeLayer: (layer) => layer.extensions.includes('yaml')
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
