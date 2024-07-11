<template lang="">
  <div></div>
</template>

<template lang="">
  <div style="background-color: #FFFAFA;">
    <v-container align-self="center" class="pa-0 pa-0">
      <v-row>
        <v-col style="text-align: center">
          <span class="text-body-1">Desbloqueie brindes exclusivos com sua pontuação. Aproveite as recompensas especiais.</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col style="text-align: center">
          <span class="text-body-1">Pontos Disponíveis: {{pontosSaldoUsuario}}</span>
        </v-col>
      </v-row>
    </v-container>
    <v-container >
      <v-row class="ma-0">
        <!-- v-for="lbrindes in lista_brindes"
        :key="lista_brindes.id_brinde"
        style="height: 100px"
        justify="center" -->
        <v-col  v-for="(brinde, index) in lista_brindes" :key="index" cols="12" style="background-color: #fff" class="text-center justify-center align-content-center">
          <!-- {{ lbrindes.id_brinde }}
          {{ lbrindes.descricao }} -->
            <v-card  style="background-color: #FFFAFA" >
              <v-card-title class="text-body-1 text-center justify-center ma-0 pt-5">
                <v-img
                contain
                rounded-circle
                width="120px"
                height="120px"
                aspect-ratio="1/1"
                v-bind:src="'img_brindes/' + brinde.imagem"
              /></v-card-title>
              <v-card-text class="ma-0 pa-0">
                <p class="text-center ma-0 pt-0 pa-0">{{ brinde.pontos }} Pontos</p>
                <p class="text-center ma-0 pt-0 pa-0">{{ brinde.descricao }} </p>
              </v-card-text>
              <div>
                <v-btn color="blue" class="mb-5" style="color: #fff; max-width: 400px; min-width: 250px;"  @click="solcitarBrinde(brinde)"
                :disabled="pontosSaldoUsuario < brinde.pontos">
                  <span class="text-center text-overline">Solicitar</span>
                </v-btn>
              </div>
              
            </v-card>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      host: process.env.host_api,

      texto_snackbar: "",
      timeout: -1,
      lista_brindes: [],
      id_usuario: 0,
      id_brinde: 0,
      descricao: "",
      pontos: 0,
      pontosSaldoUsuario: 0.00,
      totalPontosAprovados: 0.00,
      totalPontosSaldo: 0.00,
      quantidade: 0,
      imagem: [],
    };
  },

  mounted() {
    this.listaTodosOsBrindes();
    this.getLogado();
    if (this.logado === "S") {
      this.getPontosVendas();
    } else {
      this.$router.push("/login");
    }
  },

  methods: {
    async listaTodosOsBrindes() {
      // eslint-disable-next-line no-unused-vars
      const pedidos = await axios.get(`${this.host}adm_brindes/lista-completa`);

      this.lista_brindes = pedidos.data.brindes;
      this.total_tamanhos = pedidos.data.quantidade;
    },

    async getLogado() {
      this.logado = sessionStorage.getItem("logado");
      this.id_usuario = sessionStorage.getItem("idUsuario");
    },

    async getPontosVendas() {
      const pontosPedidos = await axios.get(
        `${this.host}vendas/pontosvendas/${this.id_usuario}`
      );

      this.totalPontosAprovados = pontosPedidos.data.pontos.pontosAprovados;
      this.pontosSaldoUsuario = pontosPedidos.data.pontos.pontosSaldoUsuario;
    },

    async solcitarBrinde(brinde){
      let user = this.id_usuario

      let dados = {
        id_brinde: brinde.id_brinde,
        id_usuario: user,
        pontos_do_brinde: brinde.pontos,
        pontosSaldoUsuario: this.pontosSaldoUsuario
      }
      const resposta = await axios.post(
        `${this.host}adm_brindes/solIcitarBrinde`,
        dados,
        { headers: { 'Content-Type': 'application/json' } }
      )

      this.pontosSaldoUsuario = resposta.data.saldo_pontos
    }
  },
};
</script>
