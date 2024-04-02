import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const plugins = [nodeResolve()];

const minifyPlugins = [
  terser({
    compress: true,
    mangle: {
      properties: {
        regex: /^_/,
      },
    },
  }),
];

const external = ["@dependable/state"];

export default [
  {
    input: "src/index.js",
    output: {
      file: "dist/nano-router-dependable-view.esm.js",
      format: "esm",
    },
    external,
    plugins,
  },
  {
    input: "src/index.js",
    output: {
      file: "dist/nano-router-dependable-view.esm.min.js",
      format: "esm",
    },
    external,
    plugins: plugins.concat(minifyPlugins),
  },
];
