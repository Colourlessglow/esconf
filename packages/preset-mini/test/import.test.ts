import { mkdtemp, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, beforeAll, expect, test } from 'vitest'
import { nativeImport } from '../src/nativeImport'
import { tsImport } from '../src/tsImport'

let dir: string

beforeAll(async () => {
  dir = await mkdtemp(join(tmpdir(), 'esconf-'))
})

afterAll(async () => {
  await rm(dir, { recursive: true, force: true })
})

const typescriptDescriptor = Object.getOwnPropertyDescriptor(process.features, 'typescript')

const mockNativeTs = (value: false | 'strip') => {
  Object.defineProperty(process.features, 'typescript', { value, configurable: true })
}

afterAll(() => {
  Object.defineProperty(process.features, 'typescript', typescriptDescriptor!)
})

test('tsImport loads ts natively', async () => {
  const filepath = join(dir, 'native.mts')
  await writeFile(
    filepath,
    "const config: { type: string } = { type: 'ts' }\nexport default config\n"
  )
  await expect(tsImport<{ type: string }>(filepath)).resolves.toEqual({ type: 'ts' })
})

test('tsImport falls back to jiti when native ts is unsupported', async () => {
  mockNativeTs(false)
  const filepath = join(dir, 'jiti.mts')
  await writeFile(filepath, "export default { type: 'ts' }\n")
  await expect(tsImport<{ type: string }>(filepath)).resolves.toEqual({ type: 'ts' })
  mockNativeTs('strip')
})

test('tsImport falls back to jiti on unsupported native syntax (enum)', async () => {
  const filepath = join(dir, 'enum.mts')
  await writeFile(filepath, "enum Type { A = 'a' }\nexport default { type: Type.A }\n")
  await expect(tsImport<{ type: string }>(filepath)).resolves.toEqual({ type: 'a' })
})

test('tsImport reloads updated ts file', async () => {
  const filepath = join(dir, 'reload.mts')
  await writeFile(filepath, 'export default { v: 1 }\n')
  await expect(tsImport<{ v: number }>(filepath)).resolves.toEqual({ v: 1 })
  await writeFile(filepath, 'export default { v: 2 }\n')
  await expect(tsImport<{ v: number }>(filepath)).resolves.toEqual({ v: 2 })
})

test('nativeImport reloads updated cts file', async () => {
  const filepath = join(dir, 'reload.cts')
  await writeFile(filepath, 'module.exports = { v: 1 }\n')
  await expect(nativeImport<{ v: number }>(filepath)).resolves.toEqual({ v: 1 })
  await writeFile(filepath, 'module.exports = { v: 2 }\n')
  await expect(nativeImport<{ v: number }>(filepath)).resolves.toEqual({ v: 2 })
})

test('nativeImport loads cjs file', async () => {
  const filepath = join(dir, 'config.cjs')
  await writeFile(filepath, 'module.exports = { type: "cjs" }\n')
  await expect(nativeImport<{ type: string }>(filepath)).resolves.toEqual({ type: 'cjs' })
})
