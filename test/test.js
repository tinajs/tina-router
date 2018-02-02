import './helpers/env'
import { test } from 'ava'
import { parseTabsFromGlobal } from '..'

test('parse config from global', (t) => {
  global.wx = {}
  const glob = {
    __wxConfig: {
      tabBar: {
        list: [
          {
            pagePath: 'pages/guide/app.html',
            text: 'A',
            iconPath: 'vendors/navbar/guide.png',
            selectedIconPath: 'vendors/navbar/guide-highlight.png',
          },
          {
            pagePath: 'pages/wallet/app.html',
            text: 'B',
            iconPath: 'vendors/navbar/wallet.png',
            selectedIconPath: 'vendors/navbar/wallet-highlight.png',
          },
          {
            pagePath: 'pages/user/app.html',
            text: 'C',
            iconPath: 'vendors/navbar/user.png',
            selectedIconPath: 'vendors/navbar/user-highlight.png',
          },
        ],
      },
    },
  }

  t.deepEqual(parseTabsFromGlobal(glob), [
    'pages/guide/app',
    'pages/wallet/app',
    'pages/user/app',
  ])
})
