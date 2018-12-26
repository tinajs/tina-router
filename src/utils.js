import extname from 'replace-ext'

const encodeReserveRE = /[!'()*]/g
const encodeReserveReplacer = c => '%' + c.charCodeAt(0).toString(16)
const commaRE = /%2C/g

export const globals = {
  global: this || global,
  wx,
}

export function parseTabsFromGlobal (global) {
  if (!global || !global.__wxConfig) {
    console.warn([
      '[tina-router]: 自动获取全局配置失败，请确认关闭微信开发者工具的 [ES6 转 ES5] 功能。',
      '详情请参考：https://github.com/tinajs/tina-router#' + encodeURI('无法正确地自动获取底部-tab-列表'),
    ].join('\n'))
    return
  }
  if (!global.__wxConfig.tabBar || !Array.isArray(global.__wxConfig.tabBar.list)) {
    return []
  }
  return global.__wxConfig.tabBar.list.map(({ pagePath }) => {
    return extname(pagePath, '')
  })
}

// forked from https://github.com/vuejs/vue-router/blob/ea8cb474f869a5a12a095fcb5989c45c68971d14/src/util/query.js
// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
export const encode = str => encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ',')
