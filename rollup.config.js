import babel from "rollup-plugin-babel"
import { terser } from "rollup-plugin-terser"

export default {
  input: "./src/worker.js",
  output: {
    file: "./build/campsite-client.js",
    format: "cjs",
    banner: "#!/usr/bin/env node",
  },
  plugins: [
    terser(),
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
  ],
}
