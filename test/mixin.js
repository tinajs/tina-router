import './helpers/env'
import { register } from './helpers/simulator'
import { test } from 'ava'
import sinon from 'sinon'
import { createRouterMixin } from '..'
import Tina from '@tinajs/tina'

test('mixin', async (t) => {
  let spy = sinon.spy()
  let mixin = createRouterMixin()
  Tina.Page.mixin(mixin)

  Tina.Page.define({
    onReady () {
      spy(this.$route)
    },
  })
  register('home')

  wx.reLaunch({ url: 'home' })
  t.deepEqual(spy.lastCall.args[0], {
    path: '/home',
    query: {},
    fullPath: '/home',
  })

  wx.reLaunch({ url: 'home?foo=bar' })
  t.deepEqual(spy.lastCall.args[0], {
    path: '/home',
    query: {
      foo: 'bar',
    },
    fullPath: '/home?foo=bar',
  })

  wx.reLaunch({ url: 'home?foo==123' })
  t.deepEqual(spy.lastCall.args[0], {
    path: '/home',
    query: {
      foo: '=123',
    },
    fullPath: '/home?foo=%3D123',
  })

  t.pass()
})
