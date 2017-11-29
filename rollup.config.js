import base from './rollup.conf.base.js'

export default Object.assign({}, base, {
  output: {
    file: 'dist/tina-router.js',
    format: 'umd',
    name: 'tina-router',
  },
})
