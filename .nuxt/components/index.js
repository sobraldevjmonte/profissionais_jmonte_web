export { default as NuxtLogo } from '../../components/NuxtLogo.vue'
export { default as Tutorial } from '../../components/Tutorial.vue'
export { default as VuetifyLogo } from '../../components/VuetifyLogo.vue'
export { default as Loading } from '../../components/loading.vue'
export { default as BrindesListaBrindes } from '../../components/brindes/ListaBrindes.vue'
export { default as BrindesListaBrindesPedidosAdm } from '../../components/brindes/ListaBrindesPedidosAdm.vue'
export { default as BrindesListaBrindesProf } from '../../components/brindes/ListaBrindesProf.vue'
export { default as ProdutosCadastro } from '../../components/produtos/Cadastro.vue'
export { default as ProdutosListaCategorias } from '../../components/produtos/ListaCategorias.vue'
export { default as ProdutosListaProdutos } from '../../components/produtos/ListaProdutos.vue'
export { default as ProdutosListaTamanhos } from '../../components/produtos/ListaTamanhos.vue'
export { default as MenuAdmin } from '../../components/menu/Admin.vue'
export { default as MenuProfissionais } from '../../components/menu/Profissionais.vue'
export { default as PedidosModalAnexosPedidos } from '../../components/pedidos/ModalAnexosPedidos.vue'
export { default as PedidosModalFinalizarPedido } from '../../components/pedidos/ModalFinalizarPedido.vue'
export { default as PedidosModalMotivoRejeicao } from '../../components/pedidos/ModalMotivoRejeicao.vue'
export { default as UsuariosListaUsuarios } from '../../components/usuarios/ListaUsuarios.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
