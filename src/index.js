import route from './route'
import router from './router'

export function createRouterMixin (config) {
  return [
    route,
    router(config),
  ]
}

const Plugin = {
  install ({ Page, Component }, config) {
    let router = createRouterMixin(config)
    Page.mixin(router)
    Component.mixin(router)
  },
}

export default Plugin
