<template lang="">
    <div></div>
  </template>
  <template class="container">
    <div>
      <MenuProfissionais v-if="showSistema === true" :usuariologado="nomeUsuario" />
      <BrindesListaBrindesProf />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        exibir_cadastro: false,
        host: process.env.host_api,
  
        id_usuario: 0,
        logado: null,
        nivelUsuario: 999999,
        nomeUsuario: null,
        showSistema: false,
      };
    },
    mounted() {
      this.getLogado();
      if (this.logado === "S" && this.nivelUsuario === "2") {
        this.showSistema = true;
      } else {
        this.$router.push("/login");
      }
    },
    methods: {
      getLogado() {
        this.id_usuario = sessionStorage.getItem("idUsuario");
        this.logado = sessionStorage.getItem("logado");
        this.nivelUsuario = sessionStorage.getItem("nivelUsuario");
        this.nomeUsuario = sessionStorage.getItem("nomeUsuario");
      },
    },
  };
  </script>
  
  <style>
  .container {
    max-width: 100%;
    padding-left: 10px;
    padding-top: 10px;
    align-content: flex;
  }
  .red-text {
    color: red;
  }
  
  .red-first-item .v-list-item:first-child .v-list-item__title {
    color: red;
  }
  </style>
  