import { parse } from 'url'
import wechat from './wechat'

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

  _router (type, location, params = {}) {
    let url = location + '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&')
    if (this.isTab(location)) {
      return wechat.reLaunch({ url })
    }
    return wechat[type]({ url })
  }

  navigate (location, params) {
    this._router('navigateTo', location, params)
  }

  redirect (location) {
    this._router('redirectTo', location, params)
  }

  switchTab (location) {
    wechat.switchTab(location)
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
      let pages = getCurrentPages()
      if (pages && pages[0] && pages[0].route) {
        return pages[0].route
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
