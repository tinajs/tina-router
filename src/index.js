import route from './route'
import router from './router'

export default function createRouterMixin () {
  return [
    route,
    router(),
  ]
}
