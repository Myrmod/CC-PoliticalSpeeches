/**
 * We might need rollup to bundle dependencies for example inside of a monorepo. The typescript compiler alone cannot do this.
 */

import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'build',
  },
  plugins: [typescript()],
}
