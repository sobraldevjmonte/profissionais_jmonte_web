/* eslint-disable no-unused-vars */
<template lang="">
  <div></div>
</template>
<template>
  <div>
    <MenuProfissionais
      :usuariologado="nomeUsuario"
      v-if="exibe_dados_usuario === true"
    />
    <v-container flex align-center justify-center>
      <v-card class="pa-3" elevation="10">
        Primeiro acesso(Dados do usuário)
      </v-card>
      <v-layout flex align-center justify-left>
        <v-flex xs12 sm12 md12 lg12>
          <v-card
            class="mt-5"
            elevation="10"
            max-width=""
            v-if="exibe_formulario === true"
          >
            <template>
              <div>
                <v-form v-model="valid" ref="form">
                  <v-row class="mb-0">
                    <v-col
                      cols="12"
                      sm="4"
                      md="4"
                      lg="3"
                      class="pl-md-0 ml-md-0 pl-sm-0 ml-sm-0 pb-0 mb-0"
                    >
                      <v-text-field
                        class="pl-2 pr-2"
                        type="number"
                        error-count=""
                        placeholder=""
                        label="Usuário(cpf)"
                        append-icon="person_outline"
                        v-model="usuario"
                        outlined
                        color
                        dense
                        counter="11"
                        :rules="usuarioRules"
                        required
                        min="11"
                        max="11"
                        @input="validarCampos"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="8"
                      md="8"
                      lg="4"
                      class="pr-md-0 mr-md-0 pr-sm-0 mg-sm-0 pb-0 mb-0"
                    >
                      <v-text-field
                        class="pl-2 pr-2"
                        type=""
                        error-count=""
                        placeholder=""
                        label="Nome"
                        append-icon="person"
                        v-model="nomeUsuario"
                        outlined
                        color
                        dense
                        counter="30"
                        :rules="usuarioRules"
                        required
                        min="10"
                        @input="validarCampos"
                        @keyup="maiusculasUsuario()"
                      ></v-text-field>
                    </v-col>

                    <v-col
                      cols="12"
                      sm="3"
                      md="3"
                      lg="2"
                      class="pr-md-0 pr-sm-0 mr-md-0 mr-sm-0 mt-0 pt-0 pt-lg-3"
                    >
                      <v-text-field
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
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
                        :rules="senhaRules"
                        required
                        min="5"
                        @input="validarCampos"
                        ref="senha"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="3"
                      md="3"
                      lg="2"
                      class="pt-lg-3 pt-0 mt-0"
                    >
                      <v-text-field
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                        ref="rsenha"
                        class="pl-2 pr-2"
                        error-count=""
                        placeholder=""
                        label="Rep.Senha"
                        :append-icon="e1 ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (e1 = !e1)"
                        v-model="rsenha"
                        outlined
                        color
                        dense
                        counter="20"
                        :rules="senhaRules"
                        required
                        min="5"
                        @input="validarCampos"
                        @blur="verificarSenha()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="3" md="3" lg="2" class="mt-0 pt-0">
                      <v-text-field
                        type="number"
                        class="pl-2"
                        error-count=""
                        placeholder=""
                        label="Telefone"
                        :append-icon="'phone'"
                        v-model="telefone1"
                        outlined
                        color
                        dense
                        counter="11"
                        required
                        min="11"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" sm="3" md="3" lg="2" class="mt-0 pt-0">
                      <v-text-field
                        type="number"
                        class="pr-2"
                        error-count=""
                        placeholder=""
                        label="Telefone"
                        :append-icon="'phone'"
                        v-model="telefone2"
                        outlined
                        color
                        dense
                        counter="11"
                        min="11"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <template justify-space-around>
                    <div>
                      <v-row class="pl-2 pr-2" justify="center">
                        <v-col cols="12" md="3" sm="3" lg="2">
                          <v-btn
                            block
                            elevation="5"
                            color=""
                            height="40px"
                            @click="salvarUsuario()"
                            :class="{
                              'blue darken-4 white--text': valid,
                              disabled: !valid,
                            }"
                            :disabled="botaoDesabilitado"
                          >
                            <v-icon class="pr-5">save</v-icon> Salvar</v-btn
                          >
                        </v-col>
                        <v-col cols="12" md="3" sm="3" lg="2">
                          <v-btn
                            block
                            elevation="5"
                            color="info"
                            height="40px"
                            @click="clear"
                          >
                            <v-icon class="pr-5">clear</v-icon>
                            Limpar</v-btn
                          >
                        </v-col>
                        <v-col cols="12" md="3" sm="3" lg="2">
                          <v-btn
                            block
                            elevation="5"
                            color="warning"
                            height="40px"
                            @click="voltar()"
                          >
                            <v-icon class="pr-5">arrow_back</v-icon>
                            Voltar
                          </v-btn>
                        </v-col>
                      </v-row>
                    </div>
                  </template>
                </v-form>
              </div>
            </template>
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
      show: false,
      valid: false,
      e1: false,
      senha: "",
      rsenha: "",
      senhaRules: [(v) => !!v || "Digite sua senha..."],
      usuario: "",
      usuarioRules: [(v) => !!v || "Digite seu cpf..."],
      msg: "",
      telefone1: "",
      telefone2: "",
      logado: "N",
      nivel_usuario: 999,
      id_usuario: null,
      nomeUsuario: "",
      nome_cliente: "",
      lclientes: [],
      quantidade_clientes: 0,

      host: process.env.host_api,

      snackbar: false,
      texto_snackbar: "",
      timeout: -1,
      exibe_dados_usuario: false,
      exibe_formulario: false,

      botaoDesabilitado: true,
    };
  },
  watch: {
    usuario(newVal) {
      if (newVal.length === 11) {
        console.log("dsfsdfsdfsdf");
        this.buscarDados(newVal);
      }
    },
  },
  mounted() {
    this.removeToken();
    this.exibe_dados_usuario = false;
    this.exibe_formulario = true;
  },
  methods: {
    validarCampos() {
      this.botaoDesabilitado =
        this.usuario.length < 10 ||
        this.nomeUsuario.length < 11 ||
        this.senha.length < 1 ||
        this.rsenha.length < 1;
    },
    voltar() {
      this.$router.push("/login");
    },
    showSnackBar(msg, tempo) {
      this.snackbar = true;
      this.texto_snackbar = msg;
      this.timeout = tempo;
    },
    verificarSenha() {
      if (this.senha !== this.rsenha) {
        // this.$refs.rsenha.$el.focus()
        this.showSnackBar("Senhas não conferem!", 4000);
        // this.$refs.rsenha.$el.focus()
      }
    },
    somenteNumeros(value) {
      return value.replace(/\D/g, "");
    },
    truncateString(str) {
      const maxLength = 30;
      if (str.length <= maxLength) {
        return str;
      }
      return str.substring(0, maxLength);
    },

    checkNome() {
      console.log("Check")
      if (this.nomeUsuario.length > 0) {
        this.$refs.senha.focus();
      }
    },

    async buscarDados() {
      console.log(this.usuario);
      // Função que busca dados ao alterar o valor do campo
      console.log("Buscando dados para:", this.usuario);
      // Adicione a lógica para buscar dados

      try {
        const cliente = await axios.get(
          `${this.host}clientes/buscar/${this.usuario}`
        );
        console.log(cliente.data.profissional[0].telefone);
        this.nomeUsuario = this.truncateString(cliente.data.profissional[0].indicador);
        this.telefone1 = this.somenteNumeros(cliente.data.profissional[0].telefone);
        this.senha = "";
        this.rsenha = "";

        this.checkNome()
      } catch (error) {
        console.log(error);
      }
    },
    // async getClientes() {
    //   this.lclientes = [];
    //   const clientes = await axios.get(
    //     `${this.host}clientes/${this.id_usuario}`
    //   );
    //   const tam = clientes.data.quantidade;
    //   this.quantidade_clientes = tam;
    //   for (let i = 0; i < tam; i++) {
    //     this.lclientes.push(clientes.data.clientes[i]);
    //   }
    // },
    async salvarCliente() {
      let dados = [];
      dados = {
        id_usuario: this.id_usuario,
        nome_cliente: this.truncateString(this.nome_cliente),
        id_loja: 1,
      };
      const resposta = await axios.post(`${this.host}clientes/`, dados, {
        headers: { "Content-Type": "application/json" },
      });
      const statusResposta = resposta.status;
      if (statusResposta === 201) {
        this.showSnackBar("Cliente salvo com sucesso!", 4000);
        this.nome_cliente = null;
        this.getClientes();
      }
    },
    async salvarUsuario() {
      // eslint-disable-next-line no-unused-vars
      let statusCode = 0;
      // eslint-disable-next-line no-unused-vars
      let dados = [];
      // eslint-disable-next-line no-unused-vars
      const nivel = 2; // nivel de profissional
      // eslint-disable-next-line no-unused-vars
      const loja = 1;

      if (this.nomeUsuario === null || this.nomeUsuario.length < 10) {
        this.showSnackBar(
          "Nome do usuário deve conter pelo menos 10 dígitos!",
          4000
        );
      } else if (this.usuario.length < 11 || this.usuario.length > 11) {
        this.showSnackBar("Usuário(cpf) deve conter 11 dígitos!", 4000);
      } else if (this.senha !== this.rsenha) {
        this.showSnackBar("Senhas não conferem!\nRepita a operação", 4000);
        // }
        //  else if (this.telefone1 === null || this.telefone1.length < 11) {
        //   this.showSnackBar(
        //     "Telefone principal deve ser preenchido corretamente!",
        //     4000
        //   );
      } else {
        // this.showSnackBar('Tudo ok!', 8000)

        try {
          dados = {
            nome: `${this.nomeUsuario}`,
            usuario: `${this.usuario}`,
            senha: `${this.senha}`,
            nivel: `${nivel}`,
            loja: `${loja}`,
            telefone1: `${this.telefone1}`,
            telefone2: `${this.telefone2}`,
          };
          const result = await axios.post(
            `${this.host}usuarios/salvarusuario`,
            dados,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          statusCode = result.status;

          if (statusCode === 204) {
            this.showSnackBar("Usuário já existe!", 4000);
          } else if (statusCode === 201) {
            this.$router.push("/informacoes");
          } else if (statusCode === 409) {
            this.showSnackBar("Usuário já existe!", 4000);
          }
        } catch (error) {
          this.showSnackBar("Usuário/senhas são inválidos!", 4000);
        }
      }
    },
    async login() {
      let statusCode = 0;
      let dados = [];
      let result;
      dados = { usuario: `${this.usuario}`, senha: `${this.senha}` };
      try {
        result = await axios.post(`${this.host}usuarios/login`, dados, {
          headers: { "Content-Type": "application/json" },
        });
        statusCode = result.status;

        if (statusCode === 200) {
          sessionStorage.setItem("logado", "S");
          sessionStorage.setItem("nivelUsuario", result.data.nivel_usuario);
          sessionStorage.setItem("idUsuario", result.data.id_usuario);
          sessionStorage.setItem("nomeUsuario", result.data.nome_usuario);
          process.env.usuario_logado = result.data.nome_usuario;
          this.id_usuario = result.data.id_usuario;
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
      }

      this.usuario = "";
      this.senha = "";
    },
    getNivelUsuario() {
      this.nivelUsuario = sessionStorage.getItem("nivelUsuario");
      return this.nivelUsuario;
    },
    getLogado() {
      this.id_usuario = sessionStorage.getItem("idUsuario");
      this.logado = sessionStorage.getItem("logado");
      this.nivelUsuario = sessionStorage.getItem("nivelUsuario");
      this.nomeUsuario = sessionStorage.getItem("nomeUsuario");
    },
    /* setToken(token) {
      // sessionStorage.setItem('token', token)
      sessionStorage.setItem('logado', 'S')
      sessionStorage.setItem('nivelUsuario', 2)
      sessionStorage.setItem('idUsuario', 3)
      sessionStorage.setItem('nomeUsuario', this.nomeUsuario)
    }, */
    removeToken() {
      sessionStorage.removeItem("token");
      sessionStorage.setItem("logado", "N");
      sessionStorage.setItem("nomeUsuario", "");
      sessionStorage.setItem("idUsuario", "");
      sessionStorage.setItem("nivelUsuario", "");
      process.env.usuario_logado = null;
    },
    /* getToken() {
      let t = ''
      t = sessionStorage.getItem('token')
      return t
    }, */
    maiusculasUsuario() {
      const valor = this.nomeUsuario.toUpperCase();
      this.nomeUsuario = valor;
    },
    // eslint-disable-next-line prefer-const
    maiusculasCliente() {
      const valor = this.nome_cliente.toUpperCase();
      this.nome_cliente = valor;
    },
    clear() {
      // this.$refs.form.reset();
      // this.msg = null;

      this.usuario = "";
      this.nomeUsuario = "";
      this.senha = "";
      this.telefone1 = "";
      this.telefone2 = "";
    },
  },
};
</script>

<style scoped>
.maiusculas input {
  text-transform: uppercase;
}
.loginOverlay {
  background: rgba(22, 147, 185, 0.3);
}
input[type="number"] {
  -moz-appearance: textfield;
}
.espacamento {
  padding-top: 1px;
  padding-bottom: 1px;
}
</style>
