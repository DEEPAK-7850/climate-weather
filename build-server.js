import * as esbuild from 'esbuild'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

await esbuild.build({
  entryPoints: [resolve(__dirname, './server/index.ts')],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: resolve(__dirname, './dist/server.js'),
  format: 'esm',
  banner: {
    js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);',
  },
  external: ['./node_modules/*'],
  sourcemap: true,
  loader: {
    '.ts': 'ts',
  },
}) 