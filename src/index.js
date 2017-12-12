import route from './route'
import router from './router'

export default function createRouterMixin (config) {
  return [
    route,
    router(config),
  ]
}
