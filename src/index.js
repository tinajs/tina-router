import route from './route'
import router from './router'
import { globals, parseTabsFromGlobal } from './utils'

export function createRouterMixin (config) {
  return [
    route,
    router(config),
  ]
}

const Plugin = {
  install ({ Page, Component }, config = { tabs: parseTabsFromGlobal(globals.global) }) {
    let router = createRouterMixin(config)
    Page.mixin(router)
    Component.mixin(router)
  },
}

export default Plugin

export { parseTabsFromGlobal }
