import { wx, define } from './simulator'

function noop () {}

global.wx = wx
global.App = noop
global.Page = define
global.Component = noop
global.getCurrentPages = noop
