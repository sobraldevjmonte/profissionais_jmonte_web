<template>
  <div>
    <MenuProfissionais :usuariologado="nomeUsuario" />
    <v-container grid-list-xs class="pa-0 ma-0">
      <!--v-card class="pa-2 mb-3" elevation="3">
        <v-row>
          <v-col> Total Pedidos: {{ total_pedidos }} </v-col>
          <v-col> Pontos: {{ totalPontos_pedidos }} </v-col>
        </v-row>
      </!--v-card-->
      <template>
        <div class="pl-5 pr-1 pt-2">
          <v-row align="center" justify="center">
            <v-text-field
              name="valorcliente"
              label="Digite o nome da loja..."
              id="id"
              class="pr-3 custom-font-size"
              v-model="filtercliente"
            ></v-text-field>
          </v-row>
        </div>
      </template>
      <template v-if="mostrarTabela === true">
        <v-card
          v-for="list in filtrarCliente"
          :key="list.id_vendas"
          class="ma-2"
          elevation="10"
          style="height: 160px"
        >
          <v-card-title
            class="pa-2 text-h6"
            style="height: 60px"
          >
            <v-row class="titulo">
              <v-col> J Monte {{ list.descricao_loja }} </v-col>
              <v-col cols="2">
                <v-icon
                  color="red"
                  @click="deletarVenda(list.id_vendas)"
                  size="30"
                  title="Deletar Venda"
                  >delete</v-icon
                >
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <div style="height: 160px">
            <v-row class="pt-5 pb-2 pl-5">
              <v-col cols="6" class="">
                <v-row>NP/NFe: {{ list.numero_venda }}</v-row>
              </v-col>
              <v-col cols="6" class="">
                <v-row>Data: {{ list.data_venda }}</v-row>
              </v-col>
            </v-row>
            <v-row class="pl-3 pb-5">
              <v-col cols="6" class="pl-5 pb-1">
                <v-row>Pontos: {{ list.total_pontos }}</v-row>
              </v-col>
              <v-col cols="6" class="pl-5 pb-5">
                <v-row>Status: {{ list.status }}</v-row>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </template>
      <v-bottom-navigation app background-color="#F5F5F5" style="height: 70px">
        <v-col cols="12">
          <!--v-row class="pl-3 pt-1 text-caption text-button text-sm-subtitle-1">
            <v-col cols="4" class="pt-1 pb-1">
              Pedidos: {{ total_pedidos }}
            </v-col>
            <v-col cols="8" class="pt-1 pb-1">
              Pontos: {{ totalPontos_pedidos }}
            </v-col>
          </!--v-row>
          <v-divider class="mt-2 divider" light> </v-divider -->
          <v-row class="pt-2">
            <v-col cols="4" class="pt-0 orange--text">
              Pendentes:
              <div>
                {{ totalPontosPendentes }}
              </div>
            </v-col>
            <v-col cols="4" class="pt-0 blue--text">
              Aprovados:
              <div>
                {{ totalPontosAprovados }}
              </div>
            </v-col>
            <v-col cols="4" class="pt-0 red--text">
              Rejeitados:
              <div>
                {{ totalPontosRejeitados }}
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-bottom-navigation>
    </v-container>
    <v-btn
      color="blue"
      fab
      fixed
      bottom
      right
      style="bottom: 80px; right: 40px"
      height="45"
      width="45"
      @click="novoPedido()"
    >
      <v-icon color="white">add</v-icon>
    </v-btn>
    <v-btn
      color="blue"
      fab
      fixed
      bottom
      right
      style="bottom: 80px; right: 100px"
      height="45"
      width="45"
      @click="atualizar()"
    >
      <v-icon color="white">mdi-refresh</v-icon>
    </v-btn>
    <div v-if="loading" class="overlay">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      total_pedidos: 0,
      totalPontosPendentes: 0,
      totalPontosAprovados: 0,
      totalPontosRejeitados: 0,
      mostrarTabela: true,
      lpedidos: [],
      totalPontos_pedidos: 0,
      host: process.env.host_api,
      id_usuario: 0,
      nomeUsuario: "",
      corselecionada: 0,
      filtercliente: "",

      loading: false,
    };
  },
  computed: {
    filtrarCliente() {
      if (this.filtercliente) {
        const fil = this.filtercliente.toUpperCase();
        return this.lpedidos.filter((cli) => {
          return cli.descricao_loja.toUpperCase().includes(fil);
        });
      } else {
        return this.lpedidos;
      }
    },
    color() {
      switch (this.corselecionada) {
        case 0:
          return "white";
        case 1:
          return "teal";
        case 2:
          return "brown";
        case 3:
          return "indigo";
        default:
          return "blue-grey";
      }
    },
  },
  mounted() {
    this.getLogado();
    if (this.logado === "S") {
      this.getVendas();
      this.getPontosVendas();
    } else {
      this.$router.push("/login");
    }
  },

  methods: {
    async getPontosVendas() {
      const pontosPedidos = await axios.get(
        `${this.host}vendas/pontosvendas/${this.id_usuario}`
      );
      // const dados = pedidos.data.vendas
      this.totalPontosPendentes = pontosPedidos.data.pontos.pontosPendentes;
      this.totalPontosAprovados = pontosPedidos.data.pontos.pontosAprovados;
      this.totalPontosRejeitados = pontosPedidos.data.pontos.pontosRejeitados;
    },
    novoPedido() {
      this.$router.push("/lancar_nps");
    },
    atualizar() {
      this.getVendas();
      this.getPontosVendas();
    },
    async getVendas() {
      this.loading = true;

      try {
        const pedidos = await axios.get(
          `${this.host}vendas/listarpedidosusuario/${this.id_usuario}`
        );
        const dados = pedidos.data.pedidos;
        const tam = pedidos.data.quantidade;
        this.total_pedidos = tam;
        // if (tam > 1) {
        for (let i = 0; i < tam; i++) {
          const dt = this.formataData(dados[i].data_venda);
          dados[i].data_venda = dt;

          const status = dados[i].status;
          if (status === "P") {
            dados[i].status = "PENDENTE";
          } else if (status === "R") {
            dados[i].status = "REJEITADO";
          } else if (status === "A") {
            dados[i].status = "APROVADO";
          } else if (status === "V") {
            dados[i].status = "VENCIDO";
          } else if (status === "0") {
            dados[i].status = "ABERTO";
          }
          this.totalPontos_pedidos += dados[i].total_pontos;

          this.lpedidos = dados;
        }
      } catch (error) {
      } finally {
        this.loading = false;
      }
    },

    async deletarVenda(idVenda) {
      await axios.delete(`${this.host}vendas/deletarvenda/${idVenda}`);

      this.getVendas();
      this.getPontosVendas();
    },
    getNivelUsuario() {
      this.nivelUsuario = sessionStorage.getItem("nivelUsuario");
      return this.nivelUsuario;
    },
    getLogado() {
      // this.token = sessionStorage.getItem('token')
      this.id_usuario = sessionStorage.getItem("idUsuario");
      this.logado = sessionStorage.getItem("logado");
      this.nivelUsuario = sessionStorage.getItem("nivelUsuario");
      this.nomeUsuario = sessionStorage.getItem("nomeUsuario");
    },
    formataData(data) {
      const f = data.substring(0, 10);
      const dt = f.split("-");
      const ano = dt[0];
      const mm = dt[1];
      const dd = dt[2];
      const dtFinal = dd + "/" + mm + "/" + ano;

      return dtFinal;
    },
  },
};
</script>

<style scoped>
.cliente {
  background-color: #d1d3e0;
  color: #000;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}
.fixa {
  position: fixed;
  background-color: #7897c0;
}
.backRodape {
  background-color: grey;
}
.divider {
  background: #fff;
}
.container {
  width: 100%;
  align-content: center;
  padding: 5px;
  margin-right: auto;
  margin-left: auto;
}
.titulo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  height: 60px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}

.spinner {
  border: 4px solid #dc4949;
  border-left-color: #c95151;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.custom-font-size .v-label {
  font-size: 1.0rem; /* Tamanho da fonte do label */
}

.custom-font-size .v-input__control {
  font-size: 1.0rem; /* Tamanho da fonte do texto de entrada, se necessário */
}
</style>
