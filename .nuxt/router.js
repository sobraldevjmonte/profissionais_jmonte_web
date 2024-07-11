import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _34064f62 = () => interopDefault(import('../pages/admin.vue' /* webpackChunkName: "pages/admin" */))
const _47a006c0 = () => interopDefault(import('../pages/admin_.vue' /* webpackChunkName: "pages/admin_" */))
const _0c434268 = () => interopDefault(import('../pages/brindes_adm.vue' /* webpackChunkName: "pages/brindes_adm" */))
const _25970b77 = () => interopDefault(import('../pages/brindes_adm_pedidos.vue' /* webpackChunkName: "pages/brindes_adm_pedidos" */))
const _16176db2 = () => interopDefault(import('../pages/informacoes.vue' /* webpackChunkName: "pages/informacoes" */))
const _4769b05a = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _5489b37d = () => interopDefault(import('../pages/lancar_nps.vue' /* webpackChunkName: "pages/lancar_nps" */))
const _7e352769 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _1aeb44f9 = () => interopDefault(import('../pages/login_admin.vue' /* webpackChunkName: "pages/login_admin" */))
const _2f12754e = () => interopDefault(import('../pages/pedidos.vue' /* webpackChunkName: "pages/pedidos" */))
const _a906fc6e = () => interopDefault(import('../pages/pedidosBKP.vue' /* webpackChunkName: "pages/pedidosBKP" */))
const _59d502ba = () => interopDefault(import('../pages/premios.vue' /* webpackChunkName: "pages/premios" */))
const _8e3611ba = () => interopDefault(import('../pages/primeiroacesso.vue' /* webpackChunkName: "pages/primeiroacesso" */))
const _7013496c = () => interopDefault(import('../pages/produtos.vue' /* webpackChunkName: "pages/produtos" */))
const _3143edd3 = () => interopDefault(import('../pages/profissionais.vue' /* webpackChunkName: "pages/profissionais" */))
const _7f36c5d4 = () => interopDefault(import('../pages/resetsenha.vue' /* webpackChunkName: "pages/resetsenha" */))
const _02b69035 = () => interopDefault(import('../pages/usuarios.vue' /* webpackChunkName: "pages/usuarios" */))
const _7670e472 = () => interopDefault(import('../pages/vendas.vue' /* webpackChunkName: "pages/vendas" */))
const _0b51308a = () => interopDefault(import('../pages/vendas_item.vue' /* webpackChunkName: "pages/vendas_item" */))
const _96e4f75c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _34064f62,
    name: "admin"
  }, {
    path: "/admin_",
    component: _47a006c0,
    name: "admin_"
  }, {
    path: "/brindes_adm",
    component: _0c434268,
    name: "brindes_adm"
  }, {
    path: "/brindes_adm_pedidos",
    component: _25970b77,
    name: "brindes_adm_pedidos"
  }, {
    path: "/informacoes",
    component: _16176db2,
    name: "informacoes"
  }, {
    path: "/inspire",
    component: _4769b05a,
    name: "inspire"
  }, {
    path: "/lancar_nps",
    component: _5489b37d,
    name: "lancar_nps"
  }, {
    path: "/login",
    component: _7e352769,
    name: "login"
  }, {
    path: "/login_admin",
    component: _1aeb44f9,
    name: "login_admin"
  }, {
    path: "/pedidos",
    component: _2f12754e,
    name: "pedidos"
  }, {
    path: "/pedidosBKP",
    component: _a906fc6e,
    name: "pedidosBKP"
  }, {
    path: "/premios",
    component: _59d502ba,
    name: "premios"
  }, {
    path: "/primeiroacesso",
    component: _8e3611ba,
    name: "primeiroacesso"
  }, {
    path: "/produtos",
    component: _7013496c,
    name: "produtos"
  }, {
    path: "/profissionais",
    component: _3143edd3,
    name: "profissionais"
  }, {
    path: "/resetsenha",
    component: _7f36c5d4,
    name: "resetsenha"
  }, {
    path: "/usuarios",
    component: _02b69035,
    name: "usuarios"
  }, {
    path: "/vendas",
    component: _7670e472,
    name: "vendas"
  }, {
    path: "/vendas_item",
    component: _0b51308a,
    name: "vendas_item"
  }, {
    path: "/",
    component: _96e4f75c,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
