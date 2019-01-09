import { parse } from 'url'
import querystring from 'querystring'

function todo () { console.warn('TODO') }

export let sandbox = {
  _PageOptions: [],
  _routes: {},
  _currentPages: [],
}

export class Page {
  constructor (PageOptions, route) {
    this.options = PageOptions
    this.route = route
  }
}
export const define = function (options) {
  return sandbox._PageOptions.push(options)
}
export const register = (route) => {
  sandbox._routes[route] = sandbox._PageOptions.slice(-1)[0]
}
export const emit = (instance, hook, ...args) => {
  if (typeof instance.options[hook] === 'function') {
    instance.options[hook].apply(instance, args)
  }
}
export const restore = () => {
  sandbox._PageOptions = []
  sandbox._routes = {}
  sandbox._currentPages = []
}

export const wx = {
  switchTab: todo,
  redirectTo: todo,
  navigateTo: todo,
  navigateBack: todo,
  reLaunch ({ url, success, complete }) {
    let uri = parse(url)
    let route = uri.pathname
    let query = querystring.parse(uri.query)
    for (let key in query) {
      query[key] = encodeURIComponent(query[key])
    }
    let prev = sandbox._currentPages.slice(-1)[0]
    if (prev) {
      emit(prev, 'onUnload')
    }
    let next = new Page(sandbox._routes[route], route)
    sandbox._currentPages = [next]
    emit(next, 'onLoad', query)
    emit(next, 'onShow')
    emit(next, 'onReady')
    if (typeof success === 'function') {
      success()
    }
    if (typeof complete === 'function') {
      complete()
    }
  },
}
