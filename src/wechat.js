import { globals } from './utils'

function promisify (api) {
  return (options) => new Promise((resolve, reject) => {
    api({
      ...options,
      success (...args) {
        resolve(...args)
      },
      fail (error) {
        if (error && error.errMsg) {
          return reject(new Error(error.errMsg))
        }
        if (error instanceof Error) {
          return reject(error)
        }
        reject(new Error(error))
      },
    })
  })
}

const APIS = ['switchTab', 'redirectTo', 'navigateTo', 'navigateBack', 'reLaunch']

const wechat = {}
APIS.forEach((name) => {
  wechat[name] = promisify(globals.wx[name])
})

export default wechat
