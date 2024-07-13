<template>
  <v-app>
    <v-container fluid>
      <MenuProfissionais :usuariologado="nomeUsuario" />

      <v-row class="d-flex justify-center" style="min-height: 100vh">
        <v-col cols="11" sm="8" md="6" lg="4">
          <v-card class="mb-4" style="height: 120px" elevation="0">
            <v-card-text class="d-flex align-center justify-center">
              <span class="central-text">
                Digite sua nota de venda (NP) ou NFe no aplicativo e dê um passo
                rumo ao sucesso!
              </span>
            </v-card-text>
          </v-card>

          <v-card class="mb-4" style="height: 80px">
            <router-link
              to="/lancar_np"
              class="text-decoration-none d-flex align-center"
              style="height: 100%; width: 100%"
            >
              <div class="d-flex align-center">
                <v-img
                  src="img_atalhos/lancar_pedido.png"
                  height="50"
                  width="50"
                ></v-img>
                <span class="font-size-medium ml-2">Lançar Np/Nfe/NfCe</span>
              </div>
            </router-link>
          </v-card>
          <v-card class="mb-4" style="height: 80px">
            <router-link
              to="/pedidos"
              class="text-decoration-none d-flex align-center"
              style="height: 100%; width: 100%"
            >
              <div class="d-flex align-center">
                <v-img
                  src="img_atalhos/acompanhar_pedido.png"
                  height="50"
                  width="50"
                ></v-img>
                <span class="font-size-medium ml-2">Acompanhar Pedidos</span>
              </div>
            </router-link>
          </v-card>
          <v-card class="mb-4" style="height: 80px">
            <router-link
              to="/pagina3"
              class="text-decoration-none d-flex align-center"
              style="height: 100%; width: 100%"
            >
              <div class="d-flex align-center">
                <v-img
                  src="url_da_sua_imagem3.jpg"
                  height="50"
                  width="50"
                ></v-img>
                <span class="font-size-medium ml-2">Card 3</span>
              </div>
            </router-link>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      total_pedidos: 0,
      totalPontosPendentes: 0.0,
      totalPontosAprovados: 0.0,
      totalPontosRejeitados: 0.0,
      totalPontos_pedidos: 0,

      valid: false,
      snackbar: false,
      texto_snackbar: "",
      timeout: -1,

      host: process.env.host_api,
      nomeUsuario: "",
      cor_primaria: process.env.cor_primaria,

      lanexosvenda: [],
      comprovante: [],
      comprovante_nome: "",
      comprovante_size: 0,
      comprovanteKey: 0,
      quant_anexos: 0,

      isLoading: false,
      botaoDesabilitado: true,

      numeronp: "",
      lojaselecionada: 0,
      id_venda: 0,

      lista_lojas: [
        { text: "", value: 0 },
        { text: "KENNEDY", value: 1 },
        { text: "SACY", value: 2 },
        { text: "PIÇARRA", value: 3 },
      ],
    };
  },
  mounted() {
    this.showAlertSucesso = false;
    this.showAlertErro = false;
    this.getLogado();

    if (this.logado === "S") {
      //   this.showSistema = true
      //   this.getPedidos()
      //   // this.getPontosVendas()
    } else {
      this.$router.push("/login");
    }
  },
  mounted() {
    this.showAlertSucesso = false;
    this.showAlertErro = false;
    this.getLogado();

    if (this.logado === "S") {
      //   this.showSistema = true
      //   this.getPedidos()
      //   // this.getPontosVendas()
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    getLogado() {
      this.logado = sessionStorage.getItem("logado");
      this.id_usuario = sessionStorage.getItem("idUsuario");
      this.nomeUsuario = sessionStorage.getItem("nomeUsuario");
    },
  },
};
</script>
<style scoped>
.custom-font-size .v-label {
  font-size: 1rem; /* Tamanho da fonte do label */
  font-weight: bold; /* Deixa o label em negrito */
}

.custom-font-size .v-input__control {
  font-size: 1rem; /* Tamanho da fonte do texto de entrada, se necessário */
}
.text-decoration-none {
  text-decoration: none;
}

.font-size-medium {
  font-size: 1.2rem; /* Tamanho da fonte */
}

.central-text {
  text-align: center; /* Centraliza o texto dentro do card */
}

.v-card {
  display: flex;
  align-items: center;
  padding-left: 16px; /* Ajuste o padding para alinhar à esquerda */
}
</style>
