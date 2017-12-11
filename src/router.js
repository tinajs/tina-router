import { parse } from 'url'

const wechat = wx

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

  navigate (location) {
    if (this.isTab(location)) {
      return wechat.switchTab({
        url: location,
      })
    }
    return wechat.navigateTo({
      url: location,
    })
  }

  redirect (location) {
    if (this.isTab(location)) {
      return wechat.switchTab({
        url: location,
      })
    }
    return wechat.redirectTo({
      url: location,
    })
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
