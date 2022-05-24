import babel from "@rollup/plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import nodeResolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"

import viteManifest from "./dist/manifest.json"

let extensions = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".node", ".json"]

let cf_worker_config = {
  input: {
    "cf-worker": "src/cf-worker.ts"
  },
  output: {
    dir: "dist-ssr"
  },
  external: [
    "buffer",
    "events",
    "fs",
    "http",
    "https",
    "net",
    "path",
    "querystring",
    "stream",
    "string_decoder",
    "tty",
    "url",
    "util",
    "zlib"
  ],
  plugins: [
    replace({
      preventAssignment: true,
      __MANIFEST__: JSON.stringify(viteManifest)
    }),
    nodeResolve({ preferBuiltins: true, exportConditions: ["solid", "node"] }),
    babel({
      extensions: [".ts", ".tsx"],
      babelHelpers: "bundled",
      presets: [
        ["solid", { generate: "ssr", hydratable: true }],
        "@babel/typescript"
      ]
    }),
    commonjs({ extensions })
  ]
}

export default cf_worker_config
