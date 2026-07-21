# Changelog


## v2.0.0

[compare changes](https://github.com/Colourlessglow/esconf/compare/v1.0.0...v2.0.0)

### 🚀 特性

- **preset:** ⚠️  Split presets into minimal mini and full ([31f7ce9](https://github.com/Colourlessglow/esconf/commit/31f7ce9))

### 🩹 修复

- **build:** Align package exports/types with tsdown 0.22 output ([b6100b7](https://github.com/Colourlessglow/esconf/commit/b6100b7))

### 💅 重构

- **core:** ⚠️  Load configs via unconfig-core ([578cd63](https://github.com/Colourlessglow/esconf/commit/578cd63))
- **core:** ⚠️  Extract watchConfig into @esconf/watch ([1fbc0ea](https://github.com/Colourlessglow/esconf/commit/1fbc0ea))
- **preset-mini:** ⚠️  Parse json with native JSON.parse ([71479eb](https://github.com/Colourlessglow/esconf/commit/71479eb))
- **preset-full:** Reuse parsers from @esconf/preset-mini ([c69f15c](https://github.com/Colourlessglow/esconf/commit/c69f15c))
- **preset:** ⚠️  Export parsers from the ./parser subpath ([bc4a0c8](https://github.com/Colourlessglow/esconf/commit/bc4a0c8))

### 🏡 框架

- Update CHANGELOG.md ([8840b38](https://github.com/Colourlessglow/esconf/commit/8840b38))
- Migrate formatter from prettier to oxfmt ([27bcc2a](https://github.com/Colourlessglow/esconf/commit/27bcc2a))
- Migrate linter from eslint to oxlint ([6f07c95](https://github.com/Colourlessglow/esconf/commit/6f07c95))
- Switch node version manager to mise and add editor/agent configs ([b644844](https://github.com/Colourlessglow/esconf/commit/b644844))
- Remove obsolete vitest workspace file ([c3dcf69](https://github.com/Colourlessglow/esconf/commit/c3dcf69))
- Ignore automd-generated READMEs in oxfmt ([f0ed441](https://github.com/Colourlessglow/esconf/commit/f0ed441))
- **config:** Remove inlay_hints and refactor tsdown config ([6f59692](https://github.com/Colourlessglow/esconf/commit/6f59692))

#### 🚨 破坏性改动

- **preset:** ⚠️  Split presets into minimal mini and full ([31f7ce9](https://github.com/Colourlessglow/esconf/commit/31f7ce9))
- **core:** ⚠️  Load configs via unconfig-core ([578cd63](https://github.com/Colourlessglow/esconf/commit/578cd63))
- **core:** ⚠️  Extract watchConfig into @esconf/watch ([1fbc0ea](https://github.com/Colourlessglow/esconf/commit/1fbc0ea))
- **preset-mini:** ⚠️  Parse json with native JSON.parse ([71479eb](https://github.com/Colourlessglow/esconf/commit/71479eb))
- **preset:** ⚠️  Export parsers from the ./parser subpath ([bc4a0c8](https://github.com/Colourlessglow/esconf/commit/bc4a0c8))

### ❤️ 贡献者

- Whitekite <xuxjigsaw@qq.com>

## v1.0.0

[compare changes](https://github.com/Colourlessglow/esconf/compare/v0.5.1...v1.0.0)

### 🚀 特性

- ⚠️  Upgrade minimum node version to 22 ([4f6c4ca](https://github.com/Colourlessglow/esconf/commit/4f6c4ca))
- ⚠️  Update ESM-only dist ([cf90d88](https://github.com/Colourlessglow/esconf/commit/cf90d88))
- **dep:** Update dep `pathe@2` `pkg-types@2` ([f8acafb](https://github.com/Colourlessglow/esconf/commit/f8acafb))

### 📖 文档

- Update README.md ([5ef839c](https://github.com/Colourlessglow/esconf/commit/5ef839c))
- Update README.md ([229c901](https://github.com/Colourlessglow/esconf/commit/229c901))

### 🏡 框架

- Replace `tsup` to `tsdown` ([139be24](https://github.com/Colourlessglow/esconf/commit/139be24))

#### 🚨 破坏性改动

- ⚠️  Upgrade minimum node version to 20 ([4f6c4ca](https://github.com/Colourlessglow/esconf/commit/4f6c4ca))
- ⚠️  Update ESM-only dist ([cf90d88](https://github.com/Colourlessglow/esconf/commit/cf90d88))

### ❤️ 贡献者

- Whitekite ([@Colourlessglow](http://github.com/Colourlessglow))

## v0.5.1

[compare changes](https://github.com/Colourlessglow/esconf/compare/v0.5.0...v0.5.1)

### 🚀 特性

- **core:** Update `void-fs` to `0.0.1-beta.18` reduce the number of deps ([4059b70](https://github.com/Colourlessglow/esconf/commit/4059b70))

### ❤️ 贡献者

- Whitekite ([@Colourlessglow](http://github.com/Colourlessglow))

## v0.5.0

[compare changes](https://github.com/Colourlessglow/esconf/compare/v0.4.0...v0.5.0)

### 🚀 特性

- **preset-mini:** Update `jiti` to `v2` stable ([a958438](https://github.com/Colourlessglow/esconf/commit/a958438))

### ❤️ 贡献者

- Whitekite ([@Colourlessglow](http://github.com/Colourlessglow))

## v0.4.0

[compare changes](https://github.com/Colourlessglow/esconf/compare/v0.3.3...v0.4.0)

### 🚀 特性

- Update  `chokidar` to v4 ([18dd26a](https://github.com/Colourlessglow/esconf/commit/18dd26a))

### ❤️ 贡献者

- Whitekite ([@Colourlessglow](http://github.com/Colourlessglow))

## v0.3.3

[compare changes](https://github.com/Colourlessglow/esconf/compare/v0.3.2...v0.3.3)

### 🩹 修复

- **preset-mini:** 修复项目内 rc 文件不存在，导致的全局 rc 文件不加载的问题 ([ec95fdb](https://github.com/Colourlessglow/esconf/commit/ec95fdb))

### ❤️ 贡献者

- Whitekite ([@Colourlessglow](http://github.com/Colourlessglow))

## v0.3.2

[compare changes](https://github.com/Colourlessglow/esconf/compare/v0.3.1...v0.3.2)

### 🚀 特性

- **preset-mini:** 增加默认关闭的 rc 文件解析 ([2510d27](https://github.com/Colourlessglow/esconf/commit/2510d27))

### ❤️ 贡献者

- Whitekite ([@Colourlessglow](http://github.com/Colourlessglow))

## v0.3.1

[compare changes](https://github.com/Colourlessglow/esconf/compare/v0.3.0...v0.3.1)

### 🚀 特性

- **preset-mini:** 导出 `package.json` 解析为单独 parser ([7f2420f](https://github.com/Colourlessglow/esconf/commit/7f2420f))

### ❤️ 贡献者

- Whitekite ([@Colourlessglow](http://github.com/Colourlessglow))

## v0.3.0

[compare changes](https://github.com/Colourlessglow/esconf/compare/v0.2.0...v0.3.0)

### 🚀 特性

- 增加 `watchConfig` 方法，支持监听设置文件后续变化 ([886fdf7](https://github.com/Colourlessglow/esconf/commit/886fdf7))

### 📖 文档

- Update README.md ([54ee3dc](https://github.com/Colourlessglow/esconf/commit/54ee3dc))

### ❤️ 贡献者

- Whitekite ([@Colourlessglow](http://github.com/Colourlessglow))

## v0.2.0

[compare changes](https://github.com/Colourlessglow/esconf/compare/v0.1.1...v0.2.0)

### 🚀 特性

- **preset-mini:** ⚠️  切换 `.js`, `.ts`, `.mjs`,  `.mts` 的解析工具为 `jiti@2.0.0-beta.3`,并因此额外增加 `.cts`,`.cjs` 后缀名的解析 ([9f68c72](https://github.com/Colourlessglow/esconf/commit/9f68c72))
- ⚠️  修改自定义文件解析定义规则，避免无用的文件读取 ([15a06be](https://github.com/Colourlessglow/esconf/commit/15a06be))

### 🏡 框架

- **dep:** Update dep `pkg-types@1.1.3` ([0a3a856](https://github.com/Colourlessglow/esconf/commit/0a3a856))

#### 🚨 破坏性改动

- **preset-mini:** ⚠️  切换 `.js`, `.ts`, `.mjs`,  `.mts` 的解析工具为 `jiti@2.0.0-beta.3`,并因此额外增加 `.cts`,`.cjs` 后缀名的解析 ([9f68c72](https://github.com/Colourlessglow/esconf/commit/9f68c72))
- ⚠️  修改自定义文件解析定义规则，避免无用的文件读取 ([15a06be](https://github.com/Colourlessglow/esconf/commit/15a06be))

### ❤️ 贡献者

- Whitekite <1075790909@qq.com>

## v0.1.1

[compare changes](https://github.com/Colourlessglow/esconf/compare/v0.1.0...v0.1.1)

### 🏡 框架

- Update README.md ([5c97cd3](https://github.com/Colourlessglow/esconf/commit/5c97cd3))
- **preset-mini:** Bump `importx@0.3.6` ([185430b](https://github.com/Colourlessglow/esconf/commit/185430b))

### ❤️ 贡献者

- Whitekite <1075790909@qq.com>

## v0.1.0

[compare changes](https://github.com/Colourlessglow/esconf/compare/v0.0.2...v0.1.0)

### 🚀 特性

- ⚠️  重构整体架构，修改为 类似 [`unocss`](https://unocss.dev/) 需要 core + presets 形式组合 ([7e94f0d](https://github.com/Colourlessglow/esconf/commit/7e94f0d))

#### 🚨 破坏性改动

- ⚠️  重构整体架构，修改为 类似 [`unocss`](https://unocss.dev/) 需要 core + presets 形式组合 ([7e94f0d](https://github.com/Colourlessglow/esconf/commit/7e94f0d))

### ❤️ 贡献者

- Whitekite <1075790909@qq.com>

## v0.0.2

[compare changes](https://github.com/Colourlessglow/esconf/compare/v0.0.1...v0.0.2)

### 🩹 修复

- 修复 `package.json` 配置错误 ([9391010](https://github.com/Colourlessglow/esconf/commit/9391010))

### 🏡 框架

- Update README.md ([7c14b25](https://github.com/Colourlessglow/esconf/commit/7c14b25))

### ❤️ 贡献者

- Whitekite <1075790909@qq.com>

