import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['server/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: 'dist/server.js',
  format: 'esm',
  banner: {
    js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);',
  },
}) 