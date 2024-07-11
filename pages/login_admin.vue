<template lang="">
  <div></div>
</template>
<template>
  <div>
    <v-container flex align-center justify-center class="">
      <v-layout flex align-center justify-center>
        <v-flex xs12 sm10 md6 lg4>
          <br />
          <br />
          <br />
          <br />
          <br />
          <v-card class="" elevation="10" max-width="">
            <v-card-title primary-title class="font-weight-light pb-1">
              Login
            </v-card-title>
            <v-divider class="pb-3 ml-3 mr-3 mt-0 pt-0"></v-divider>
            <template>
              <div>
                <v-form v-model="valid" ref="form">
                  <template>
                    <v-row justify="center">
                      <v-col cols="12" class="pb-0 text-center">
                        <v-text-field
                          class="pl-2 pr-2"
                          type="text"
                          error-count=""
                          placeholder=""
                          label="Usuário (CPF)"
                          append-icon="person"
                          v-model="usuario"
                          outlined
                          color
                          dense
                          counter="11"
                          required
                          min="5"
                          @input="validarCampos"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" class="pt-0 text-center">
                        <v-text-field
                          :type="show ? 'text' : 'password'"
                          class="pl-2 pr-2"
                          error-count=""
                          placeholder=""
                          label="Senha"
                          :append-icon="e1 ? 'visibility' : 'visibility_off'"
                          :append-icon-cb="() => (e1 = !e1)"
                          v-model="senha"
                          outlined
                          color
                          dense
                          counter="20"
                          required
                          min="5"
                          clearable
                          @click:append="show = !show"
                          @input="validarCampos"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </template>
                  <template>
                    <div>
                      <v-row class="pa-2 justify-center">
                        <v-col
                          cols="11"
                          sm="6"
                          md="8"
                          class="d-flex justify-center"
                        >
                          <v-btn
                            :style="{
                              backgroundColor: cor_primaria,
                              color: 'white',
                              height: '40px',
                            }"
                            block
                            elevation="5"
                            @click="login()"
                            :disabled="botaoDesabilitado"
                          >
                            Entrar
                          </v-btn>
                        </v-col>
                        <v-col
                          cols="11"
                          sm="6"
                          md="8"
                          class="d-flex justify-center"
                        >
                          <v-btn
                            block
                            elevation="5"
                            color="info"
                            @click="clear"
                            :style="{ height: '40px' }"
                          >
                            Limpar
                          </v-btn>
                        </v-col>
                      </v-row>
                      <div v-if="loading" class="overlay">
                        <div class="spinner"></div>
                      </div>
                    </div>
                  </template>
                </v-form>
              </div>
            </template>
            <v-divider></v-divider>
            <div class="pa-2 grey--text text-caption">V1.0.16 (12/01/2024)</div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ texto_snackbar }}
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      botaoDesabilitado: true,

      show: false,
      valid: false,
      e1: false,
      senha: "",
      senhaRules: [(v) => !!v || "Digite sua senha..."],
      usuario: "",
      usuarioRules: [(v) => !!v || "Digite seu cpf..."],
      msg: null,

      logado: "N",
      nivel_usuario: 999,
      id_usuario: 999999999,
      nome_usuario: "",

      host: process.env.host_api,
      cor_primaria: process.env.cor_primaria,
      snackbar: false,
      texto_snackbar: "",
      timeout: -1,
      loading: false,
    };
  },
  mounted() {
    this.removeToken();
    process.env.usuario_logado = null;
  },
  methods: {
    showSnackBar(msg, tempo) {
      this.snackbar = true;
      this.texto_snackbar = msg;
      this.timeout = tempo;
    },
    validarCampos() {
      this.botaoDesabilitado = this.usuario.length < 1 || this.senha.length < 1;
    },
    async login() {
      // this.$refs.form.$el.submit()

      this.loading = true;

      let statusCode = 0;
      let result;
      let dados = { usuario: `${this.usuario}`, senha: `${this.senha}` };
      try {
        result = await axios.post(`${this.host}usuarios/login`, dados, {
          headers: {
            "content-type": "application/json",
          },
        });
        statusCode = result.status;

        if (statusCode === 200) {
          sessionStorage.setItem("logado", "S");
          sessionStorage.setItem("nivelUsuario", result.data.nivel_usuario);
          sessionStorage.setItem("idUsuario", result.data.id_usuario);
          sessionStorage.setItem("nomeUsuario", result.data.nome_usuario);
          process.env.usuario_logado = result.data.nome_usuario;

          const n = this.getNivelUsuario();
          if (n === "1") {
            this.showSnackBar("Sucesso!", 4000);
            this.$router.push("/admin");
          } else if (n === "2") {
            this.$router.push("/profissionais");
          } else if (n === "99") {
            console.log("---------------- nivel 99 ----------------------");
          }
        } else {
          this.showSnackBar("Usuário/senhas incorretos!", 4000);
          this.usuario = null;
          this.senha = null;
          // this.removeToken()
        }
      } catch (error) {
        this.showSnackBar(
          "Usuário/senhas são obrigatórios ou estão incorretos!",
          4000
        );
      } finally {
        this.loading = false;
      }

      this.usuario = "";
      this.senha = "";
    },
    getNivelUsuario() {
      this.nivelUsuario = sessionStorage.getItem("nivelUsuario");
      return this.nivelUsuario;
    },
    getLogado() {
      this.logado = sessionStorage.getItem("logado");
      return this.logado;
    },
    setToken(token) {
      // sessionStorage.setItem('token', token)
      sessionStorage.setItem("logado", "S");
      sessionStorage.setItem("nivelUsuario", 2);
      sessionStorage.setItem("idUsuario", 3);
      sessionStorage.setItem("nomeUsuario", this.nome_usuario);
    },
    removeToken() {
      sessionStorage.removeItem("token");
      sessionStorage.setItem("logado", "N");
      sessionStorage.setItem("nomeUsuario", "");
      sessionStorage.setItem("idUsuario", "");
      sessionStorage.setItem("nivelUsuario", "");
      process.env.usuario_logado = null;
    },
    getToken() {
      let t = "";
      t = sessionStorage.getItem("token");
      return t;
    },
    clear() {
      this.$refs.form.reset();
      this.msg = null;
    },
  },
};
</script>

<style scoped>
.loginOverlay {
  background: rgba(22, 147, 185, 0.3);
}
input[type="number"] {
  -moz-appearance: textfield;
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
</style>
