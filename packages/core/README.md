# @esconf/core

配置文件加载工具

API 设计参考自 [antfu/unconfig](https://github.com/antfu/unconfig)

 `esconf` 在使用时更像 [`unocss`](https://unocss.dev/) 需要 core + presets 形式组合

<!-- automd:badges color="orange" license licenseBranch  bundlephobia packagephobia  -->

[![npm version](https://img.shields.io/npm/v/@esconf/core?color=orange)](https://npmjs.com/package/@esconf/core)
[![npm downloads](https://img.shields.io/npm/dm/@esconf/core?color=orange)](https://npm.chart.dev/@esconf/core)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@esconf/core?color=orange)](https://bundlephobia.com/package/@esconf/core)
[![license](https://img.shields.io/github/license/Colourlessglow/esconf?color=orange)](https://github.com/Colourlessglow/esconf/blob/true/LICENSE)

<!-- /automd -->

## 安装

<!-- automd:pm-install  -->

```sh
# ✨ Auto-detect
npx nypm install @esconf/core

# npm
npm install @esconf/core

# yarn
yarn add @esconf/core

# pnpm
pnpm install @esconf/core

# bun
bun install @esconf/core

# deno
deno install @esconf/core
```

<!-- /automd -->

## 简单使用

```ts
import { loadConfig } from '@esconf/core'
import { jsParser, tomlParser, tsParser, yamlParser } from '@esconf/preset-mini'

const config = await loadConfig({
    // 数组越靠前配置文件的优先级越高
    layers: [
      {
        // load from vrx.config.{mts,ts}
        files: ['vrx.config'],
        extensions: ['mts', 'ts'],
        parser: tsParser(),
      },
      {
        // load from vrx.config.{js,mjs}
        files: ['vrx.config'],
        extensions: ['js', 'mjs'],
        parser: jsParser(),
      },
      {
        // load from vrx.{yaml,yml}
        files: ['vrx'],
        extensions: ['yaml', 'yml'],
        parser: yamlParser(),
      },
      {
        name: 'toml',
         // load from vrx.toml
        files: ['vrx'],
        extensions: ['toml'],
        parser: tomlParser(),
      },
    ],
    // 配置默认值
    default: { defaultValue: 'value' },
    cwd: process.cwd(),
    // 如果某个 layer 命名了，可以用 layer 的名称在运行时排除
    excludeLayer: ['toml'],
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
