import { encode } from './utils'

export default function $route (options, Model) {
  function install (query) {
    const qs = Object.keys(query).map((key) => `${encode(key)}=${query[key]}`).join('&')
    Object.keys(query).forEach(key => {
      try {
        query[key] = JSON.parse(decodeURIComponent(query[key]))
      } catch (e) { }
    })
    this.$route = {
      path: `/${this.route}`,
      query,
      fullPath: qs ? `/${this.route}?${qs}` : `/${this.route}`,
    }
    this.$log('Route Middleware', 'Ready')
  }

  return Model.mix(options, {
    beforeLoad: install,
  })
}
