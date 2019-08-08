import { parse } from 'url'
import wechat from './wechat'
import { encode, globals } from './utils'

class Router {
  _tabs = []
  location = ''

  constructor (config) {
    if (config && config.tabs) {
      this._tabs = config.tabs
    }
  }

  isTab (location) {
    return ~this._tabs.indexOf(parse(location.slice(1)).pathname)
  }

  _router (type, location, query = {}) {
    let qs = Object.keys(query).map(key => `${encode(key)}=${encode(query[key])}`).join('&')
    let url = qs ? `${location}?${qs}` : location
    if (this.isTab(location)) {
      return wechat.reLaunch({ url })
    }
    return wechat[type]({ url })
  }

  navigate (location, query) {
    return this._router('navigateTo', location, query)
  }

  redirect (location, query) {
    return this._router('redirectTo', location, query)
  }

  switchTab (location) {
    return wechat.switchTab({ url: location })
  }

  back () {
    return wechat.navigateBack()
  }
}

export default function createRouterMixin (config) {
  let router = new Router(config)

  return function RouterMixin (options, Model) {
    function current () {
      if (this && this.$route && this.$route.fullPath) {
        return this.$route.fullPath
      }
      if (this && this.route) {
        return this.route
      }
      let pages = globals.getCurrentPages()
      if (pages) {
        let last = pages[pages.length - 1]
        if (last && last.route) {
          return last.route
        }
      }
    }

    function install () {
      this.$router = router
      this.$router.location = this::current()
      this.$log('Router Mixin', 'Ready')
    }

    return Model.mix(options, {
      beforeLoad: install,
      created: install,
    })
  }
}
