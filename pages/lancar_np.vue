<template lang="">
  <div></div>
</template>

<template lang="">
  <div
    justify="center"
    align="center"
    style="background-color: #fffafa; max-width: 400px"
  >
  <v-overlay :value="loading">
    <div class="loading-container">
      <v-progress-circular
        indeterminate
        color="red"
        size="70"
      ></v-progress-circular>
      <span class="loading-text">Salvando, por favor aguarde...</span>
    </div>
  </v-overlay>
    <MenuProfissionais :usuariologado="nomeUsuario" />
    <template>
      <div class="pa-2 mt-1 mb-1">
        <v-form v-model="valid" ref="form">
          <v-row>
            <v-col cols="12" class="text-center pa-5 mt-5 pt-5">
              <span class="central-text"
                >Digite sua nota de venda (NP),NFe ou Cupom no aplicativo e dê
                um passo rumo ao sucesso!
              </span>
            </v-col>
            <v-col cols="12">
              <v-text-field
                class=""
                type="text"
                error-count=""
                placeholder=""
                label="Número NP/Nota Fiscal"
                v-model="numeronp"
                outlined
                color
                dense
                counter="15"
                required
                min="4"
                @input="validarCampos"
                inputmode="numeric"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="lojaselecionada"
                :items="lista_lojas"
                item-value="value"
                label="Selecione a Loja"
                overflow
                editable
                class="text-caption font-weight-light custom-font-size"
                @change="selecionarLoja"
                :menu-props="{ contentClass: 'red-first-item' }"
                @input="validarCampos"
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </div>
    </template>

    <template>
      <div class="pt-5 pl-2 pr-5 pb-5">
        <v-row align="center" justify="center">
          <v-file-input
            @change="carregarImagem"
            id="comprovante"
            :key="comprovanteKey"
            class="pr-5"
            show-size
            counter=""
          ></v-file-input>
          <!--v-file-input capture="camera" /-->

          <!--input type="file" @change="uploadImage"  title="abutab"/-->
          <!-- <v-icon
            @click="anexarComprovante()"
            @change="validarAnexo()"
            color="blue"
            v-if="comprovante_size > 0"
            >send</v-icon
          > -->
        </v-row>
      </div>
    </template>

    <template>
      <div>
        <v-row class="pa-2 justify-center">
          <v-col cols="12">
            <v-btn
              :style="{
                backgroundColor: cor_primaria,
                color: 'white',
                height: '40px',
              }"
              block
              elevation="5"
              @click="finalizarPedido()"
              :disabled="botaoDesabilitado"
            >
              Finalizar Pedido
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              color="info"
              block
              elevation="5"
              height="40px"
              to="/lancar_nps"
            >
              Voltar
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </template>
    <v-snackbar v-model="snackbar" :timeout="timeout" class="text-center">
      {{ texto_snackbar }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
    <!-- <div v-if="loading" class="overlay">
      <div class="spinner"></div>
    </div> -->
  </div>
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
      loading: false,
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
  methods: {
    showSnackBar(msg, tempo) {
      this.snackbar = true;
      this.texto_snackbar = msg;
      this.timeout = tempo;
      this.comprovanteKey++;
    },
    limparCampos() {
      this.numeronp = "";
      this.lojaselecionada = null;
      // this.msg = "";
      // this.texto_snackbar = "";
    },
    async finalizarPedido(st) {
      this.msg = "";
      this.texto_snackbar = "";
      this.loading = true;

      try {
        let dados = {
          id_usuario: this.id_usuario,
          lojaselecionada: this.lojaselecionada,
          numeronp: this.numeronp,
        };
        const resposta = await axios.post(
          `${this.host}vendas/finalizar_pedido_parceiro_jmonte/`,
          dados,
          { headers: { "Content-Type": "application/json" } }
        );

        const statusResposta = resposta.status;
        this.id_venda = resposta.data.id_venda;

        if (statusResposta === 201) {
          try {
            let st = await this.anexarComprovante();
            console.log(st);
            if (st === 200) {
              this.loading = false;
              this.showSnackBar("Comprovante anexado com sucesso!", 3000);
              await this.delay(3000); // Aguarda 2 segundos
              this.showSnackBar(
                "Pedido finalizado! Aguarde processamento e retorno da administração.",
                5000
              );

              await this.delay(5000); // Aguarda 2 segundos
              this.showSnackBar(
                "Você pode acompanhar seus pedidos no menu 'Meus Pedidos'",
                8000
              );
            } else {
              this.showSnackBar("Não foi possível anexar o arquivo!", 5000);
            }
          } catch (error) {
            console.log(error);
          } finally {
            this.comprovante_nome = "";
            this.limparCampos();
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        //this.loading = false;
      }

      // this.showSnackBar(
      //   "Pedido finalizado! Aguarde processamento e retorno da administração.",
      //   10000
      // );
    },
    getLogado() {
      this.logado = sessionStorage.getItem("logado");
      this.id_usuario = sessionStorage.getItem("idUsuario");
      this.nomeUsuario = sessionStorage.getItem("nomeUsuario");
    },
    validarCampos() {
      this.numeronp = this.numeronp.replace(/\D/g, '');
      this.botaoDesabilitado =
        this.numeronp.length < 1 ||
        this.lojaselecionada < 1 ||
        this.comprovante_size < 1;
    },
    selecionarLoja(e) {
      console.log("*******loja selecionada : " + e);
    },
    carregarImagem(e) {
      if (e) {
        this.comprovante = e;
        this.comprovante_nome = e.name;
        this.comprovante_size = e.size;
        this.validarCampos();
      } else {
        this.comprovante = null;
        this.comprovante_nome = "";
        this.comprovante_size = 0;
      }
    },
    delay(milliseconds) {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    },

    async anexarComprovante(e) {
      if (this.comprovante_size > 0) {
        const dataForm = new FormData();
        dataForm.append("comprovante", this.comprovante);

        try {
          const resposta = await axios.post(
            `${this.host}vendas/anexararquivos/${this.id_venda}`,
            dataForm,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          return resposta.status;
        } catch (error) {
          console.error(error);
        }
      } else {
        this.showSnackBar("Comprovante não incluído!", 4000);
      }
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
.spinner {
  border: 4px solid #dc4949;
  border-left-color: #f3eded;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.overlay {
  background-color: rgba(0, 0, 0, 0.8) !important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.loading-text {
  color: white;
  margin-top: 16px;
  font-size: 1.2rem;
  font-weight: bold;
}
/* Campo de entrada numérico */
.v-text-field--type-text input[type="number"] {
  -moz-appearance: textfield;
}

.v-text-field--type-text input[type="number"]::-webkit-outer-spin-button,
.v-text-field--type-text input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
