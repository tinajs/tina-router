import { parse } from 'url'
import { helpers } from '@tinajs/tina'

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

export default function createRouterMiddleware (options) {
  let router = new Router(options)

  return function RouterMiddleware (properties) {
    function current () {
      return (this && (this.$route && this.$route.fullPath) || this.route) || getCurrentPages()[0].route
    }

    return helpers.addHooks(properties, {
      beforeLoad () {
        this.$router = router
        this.$router.location = this::current()
        this.$log('Router Middleware', 'Ready')
      }
    })
  }
}
