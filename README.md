# esconf

配置文件加载工具

内置配置文件解析器一览
- `.mts` `.ts` 基于 [importx](https://github.com/antfu/importx) 实现
- `.mjs` `.js`  基于 原生 `import('id')` 实现
- `.json` `.jsonc` `.json5` `.yaml` `.yml` `.toml` 基于 [confbox](https://github.com/unjs/confbox) 实现

<!-- automd:badges color="orange" license licenseBranch  bundlephobia packagephobia  -->

[![npm version](https://img.shields.io/npm/v/esconf?color=orange)](https://npmjs.com/package/esconf)
[![npm downloads](https://img.shields.io/npm/dm/esconf?color=orange)](https://npmjs.com/package/esconf)
[![bundle size](https://img.shields.io/bundlephobia/minzip/esconf?color=orange)](https://bundlephobia.com/package/esconf)
[![license](https://img.shields.io/github/license/Colourlessglow/esconf?color=orange)](https://github.com/Colourlessglow/esconf/blob/true/LICENSE)

<!-- /automd -->

> 注意： 预设 js，ts 解析只包含 es module 的解析


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
pnpm install esconf

# bun
bun install esconf
```

## 简单使用

```ts
import { loadConfig } from 'esconf'
import { packageJsonLayer , tsParser } from 'esconf/presets'

const config = await loadConfig({
    // 数组越靠前配置文件的优先级越高
    layers: [
      {
        // load from vrx.config.{mts,ts}
        files: ['vrx.config'],
        extensions: ['mts', 'ts'],
        parser: 'ts',
      },
      {
        // load from vrx.config.{js,mjs}
        files: ['vrx.config'],
        extensions: ['js', 'mjs'],
        parser: 'js',
      },
      {
        // load from vrx.{yaml,yml}
        files: ['vrx'],
        extensions: ['yaml', 'yml'],
        parser: 'yaml',
      },
      {
         // load from vrx.toml
        files: ['vrx'],
        extensions: ['toml'],
        parser: 'toml',
      },
      // 从 package.json 的 vrx key 获取
      packageJsonLayer({ configKey: 'vrx' }),
      // 自定义 cjs 获取的读取
      {
        file:['vrx'],
        extensions:['cjs'],
        parser:(code,id)=> {
          return require(id)
        }
      },
      {
        file:['vrx'],
        extensions:['cts'],
        parser: tsParser({
          // 可继承内置的 tsParser
          // 配置 importx 的选项以尝试支持 cts 文件的读取
          // ....
        })
      },
    ],
    // 配置默认值
    default: { defaultValue: 'value' },
    cwd: process.cwd(),
  })
```

<!-- /automd -->

<!-- /automd -->

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
