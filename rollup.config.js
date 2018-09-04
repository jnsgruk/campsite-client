import babel from "rollup-plugin-babel"
import { terser } from "rollup-plugin-terser"

export default {
  input: "./src/worker.js",
  output: {
    file: "./build/campsite-client.js",
    format: "cjs",
  },
  plugins: [
    babel({
      babelrc: false,
      presets: [
        [
          "env",
          {
            modules: false,
            targets: {
              node: "current",
            },
          },
        ],
      ],
      plugins: [
        "transform-object-rest-spread",
        "babel-plugin-transform-class-properties",
      ],
    }),
    terser({
      // toplevel: true,
      // mangle: {
      // properties: true,
      // },
    }),
  ],
}
