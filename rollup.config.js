import uglify from 'rollup-plugin-uglify'
import base from './rollup.conf.base.js'

export default Object.assign({}, base, {
  output: {
    file: 'dist/tina-router.min.js',
    format: 'umd',
    name: 'tina-router',
  },
  plugins: base.plugins.concat([
    uglify(),
  ]),
})
