import isEmpty from 'isempty'
import querystring from 'querystring'

export default function $route (options, Model) {
  function install (query) {
    this.$route = {
      path: `/${this.route}`,
      query: { ...query },
      fullPath: isEmpty(query) ? `/${this.route}` : `/${this.route}?${querystring.stringify(query)}`,
    }
    this.$log('Route Middleware', 'Ready')
  }

  return Model.mix(options, {
    beforeLoad: install,
  })
}
