import querystring from 'querystring'
import { encode } from './utils'

export default function $route (options, Model) {
  function install (query) {
    const qs = Object.keys(query).map((key) => `${encode(key)}=${query[key]}`).join('&')
    this.$route = {
      path: `/${this.route}`,
      query: querystring.parse(qs),
      fullPath: qs ? `/${this.route}?${qs}` : `/${this.route}`,
    }
    this.$log('Route Middleware', 'Ready')
  }

  return Model.mix(options, {
    beforeLoad: install,
  })
}
