<template lang="">
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar height="50" :clipped-left="clipped" fixed app :style="{ backgroundColor: cor_primaria, color: '#fff' }" class="white-text">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="color: #fff;"/>
      <v-toolbar-title
        v-model="nomeUsuario"
        class=" text-body-1 text-uppercase"
        v-text="usuariologado"
      />
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['usuariologado'],
  data() {
    return {
      cor_primaria: process.env.cor_primaria,

      clipped: false,
      drawer: false,
      fixed: false,
      token: '',
      logado: 'N',
      nivelUsuario: 999,
      idUsuario: 99999999,
      nomeUsuario: '',
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'list',
          title: 'Meus Pedidos',
          to: '/pedidos',
        },
        {
          icon: 'swap_horiz',
          title: 'Entrar/Sair',
          to: '/login',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vendas Profissionais',
    }
  },

  mounted() {
    process.env.usuario_logado = sessionStorage.getItem('nomeUsuario')
    this.nomeUsuario = process.env.usuario_logado
  },

  methods: {
    getLogado() {
      this.token = sessionStorage.getItem('token')
      this.logado = sessionStorage.getItem('logado')
      this.nivelUsuario = sessionStorage.getItem('nivelUsuario')
      this.idUsuario = sessionStorage.getItem('idUsuario')
      this.nomeUsuario = sessionStorage.getItem('nomeUsuario')
    },
  },
}
</script>
