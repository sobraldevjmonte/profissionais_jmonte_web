<template lang="">
  <div></div>
</template>

<template lang="">
  <div class="pl-2 pt-0 ma-0">
    <span class="pt-1">Cadastro de Brindes</span>
    <span class="">(Quant.: {{ quantidadet }})</span>
    <v-divider class="mt-2"></v-divider>
    <v-row align="center" justify="center">
      <v-col cols="1">
        <v-btn
          color="success"
          icon
          class="pt-1 pr-0 mr-0"
          title="Atualizar lista de brindes"
          v-model="filterbrindes"
          @click="refreshBrindes()"
        >
          <v-icon>refresh</v-icon></v-btn
        >
      </v-col>
      <v-col cols="3">
        <v-text-field
          name="name"
          label="Pesquisa brindes..."
          class="text-caption"
          disabled="disabled"
        ></v-text-field>
      </v-col>
      <v-col class="">
        <v-btn
          color="success"
          rounded
          icon
          class="botaoNovo"
          elevation="5"
          title="Novo Brinde"
        >
          <v-icon>add</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <v-divider class="pb-2"></v-divider>
    <template v-if="exibir_cadastro === true">
      <div class="telacad">
        <v-card elevation="5" transition="fade-transition" class="card_novo" max-width="60%">
          <v-card-text class="pb-0 mb-0">
            <span v-if="operacao === 'novo'">Novo Brinde</span>
            <span v-else class="text-subtitle-1"
              >Editar Brinde
              <span class="font-weight-bold">
                - {{ descricao_cad }}(Id: {{ id_novobrinde }})</span
              >
            </span>
          </v-card-text>
          <v-divider class="pa-0 pb-2 ml-3 mr-3"></v-divider>
          <v-row class="pl-5">
            <v-col v-if="operacao !== 'novo'" cols="12">
              <v-img
                contain
                rounded-circle
                align="center"
                width="150px"
                height="150px"
                aspect-ratio="1/1"
                class=""
                v-bind:src="'img_brindes/' + imagem_nome"
              ></v-img>
            </v-col>
          </v-row>
          <v-row align="center" class="pl-5">
            <v-col cols="3">
              <v-text-field
                type=""
                error-count="Qtd de caracteres incorreta!"
                placeholder="Descrição do brinde..."
                label="Descrição"
                v-model="descricao_cad"
                dense
                counter="30"
                required
                min="10"
                class="text-body-2"
                @keyup="maiusculasDescricao()"
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-text-field
                type=""
                error-count="Qtd de caracteres incorreta!"
                placeholder="Pontos do brinde..."
                label="Pontos"
                v-model="pontos_cad"
                dense
                counter="8"
                required
                min="2"
                class="text-body-2"
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-text-field
                type=""
                error-count="Qtd de caracteres incorreta!"
                placeholder="Quantidade de brindes disponível."
                label="Estoque"
                v-model="quantidade_cad"
                dense
                counter="3"
                required
                min="1"
                class="text-body-2"
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-text-field
                type=""
                error-count="Qtd de caracteres incorreta!"
                placeholder="Valor do brinde em R$"
                label="Valor em R$"
                v-model="valor_cad"
                dense
                counter="6"
                required
                min="1"
                class="text-body-2"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-file-input
                dense
                counter
                label="Link Imagem"
                class="text-body-2"
                @change="carregarImagem"
                :key="imagemKey"
                show-size
                ></v-file-input
              >
            </v-col>
          </v-row>
          <v-divider class="mb-3 mt-3"></v-divider>
          <v-row class="pa-2 pr-5" justify="end" >
            <v-btn color="success" class="mr-2" small>
              <v-icon>save</v-icon>
              <span v-if="operacao === 'novo'" @click="salvarBrinde()"
                >Salvar</span
              >
              <span v-else @click="atualizarBrinde()">Atualizar</span>
            </v-btn>
            <v-btn color="warning" class="mr-2" @click="limparCampos()" small>
              <v-icon>refresh</v-icon>
              Limpar
            </v-btn>
            <v-btn color="error" @click="fecharJanela()" small>
              <v-icon>clear</v-icon>
              Fechar
            </v-btn>
          </v-row>
        </v-card>
      </div>
    </template>
    

    <!----------------------------------- TABELA DE BRINDES  ----------------------------------->
    <v-simple-table
      dense
      height="800px"
      fixed-header
      class="tabelaCategorias"
      v-if="exibir_cadastro === false"
    >
      <thead>
        <tr>
          <th class="black--text text-end text-body-2" width="5%">ID</th>
          <th class="black--text text-body-2" width=""></th>
          <th class="black--text text-body-2">DESCRIÇÃO</th>
          <th class="black--text text-end text-body-2">PONTOS</th>
          <th class="black--text text-end text-body-2">ESTOQUE</th>
          <th class="black--text text-end text-body-2">VALOR</th>
          <th class="black--text text-body-2">LINK IMG</th>
          <th class="black--text text-center text-body-2" width="10%">ATIVO</th>
          <th class="black--text text-body-2" width="20%">AÇÕES</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="lista_brindes in filtrarBrinde"
          :key="lista_brindes.id_brinde"
        >
          <td class="font-weight-light text-caption text-end">
            {{ lista_brindes.id_brinde }}
          </td>
          <td class="pa-1">
            <v-img
              contain
              rounded-circle
              align="center"
              width="30px"
              height="30px"
              aspect-ratio="1/1"
              
              v-bind:src="'img_brindes/' + lista_brindes.imagem"
            />
          </td>
          <td class="font-weight-light text-body-2">
            {{ lista_brindes.descricao }}
          </td>
          <td class="font-weight-light text-end text-body-2">
            {{ lista_brindes.pontos }}
          </td>
          <td class="font-weight-light ttext-end text-body-2">
            {{ lista_brindes.quantidade }}
          </td>
          <td class="font-weight-light text-end text-body-2">
            R$ {{ lista_brindes.valor }}
          </td>
          <td class="font-weight-light text-body-2">
            {{ lista_brindes.imagem }}
          </td>
          <td class="font-weight-light text-center text-body-2">
            {{ lista_brindes.ativo }}
          </td>
          <td class="text-left">
            <v-row>
              <v-btn
                x-small
                color="blue"
                elevation="5"
                class="pa-3 botao"
                title="Editar Brinde(disabled)"
                icon
                @click="editarBrinde(lista_brindes)"
              >
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn
                color="red"
                x-small
                elevation="5"
                class="pa-3 ml-1 botao"
                title="Excluir Brinde(disabled)"
                icon
                @click="excluirBrinde(lista_brindes)"
              >
                <v-icon>clear</v-icon>
              </v-btn>
              <v-btn
                x-small
                elevation="5"
                class="pa-3 ml-1 botao"
                title="Ativar/Inativar Brinde"
                icon
                @click="inativarBrinde(lista_brindes)"
              >
                <v-icon>compare_arrows</v-icon>
              </v-btn>
            </v-row>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-snackbar v-model="snackbar" :timeout="timeout" v-if="snackbar === true">
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
      exibir_cadastro: false,
      host: process.env.host_api,
      exibir_cadastro: false,
      snackbar: false,

      texto_snackbar: "",
      timeout: -1,
      lista_brindes: [],

      id_brinde: 0,
      descricao: "",
      pontos: 0,
      valor: 0.0,
      quantidadet: 0,
      link: "",
      ativo: true,
      imagem: [],
      imagem_nome: "",
      imagemKey: 0,

      total_brindes: 0,
      operacao: "",
      id_novobrinde: 0,

      filterbrindes: "",

      descricao_cad: '',
      pontos_cad: 0,
      quantidade_cad: 0,
      valor_cad: 0,
      link_cad: '',
    };
  },
  computed: {
    filtrarBrinde() {
      if (this.filterbrindes) {
        const fil = this.filterbrindes.toUpperCase();
        return this.lista_brindes.filter((cli) => {
          return cli.descricao.toUpperCase().includes(fil);
        });
      } else {
        return this.lista_brindes;
      }
    },
  },
  mounted() {
    this.listaTodosOsBrindes();
  },

  methods: {
    async anexarImagem() {
      const dataForm = new FormData();
      dataForm.append("imagembrinde", this.imagem);

      await axios.post(
        `${this.host}adm_brindes/anexararquivos/${this.id_novobrinde}`,
        dataForm,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      this.imagemKey++;
      this.imagem_nome = "";
      this.imagem = [];
      this.listaTodosOsBrindes()
    },
    editarBrinde(brinde) {
      this.operacao = "editar";
      this.exibir_cadastro = true;
      this.id_novobrinde = brinde.id_brinde;
      this.descricao_cad = brinde.descricao;
      this.pontos_cad = brinde.pontos;
      this.valor_cad = brinde.valor;
      this.quantidade_cad = brinde.quantidade;
      this.imagem_nome = brinde.imagem;
      this.imagem_cad = brinde.imagem;
    },
    cadBrinde() {
      this.operacao = "novo";
      this.exibir_cadastro = true;
      this.limparCampos();
    },
    async salvarBrinde() {},
    async atualizarBrinde() {
      let dados = []
      dados = {
        descricao: this.descricao_cad,
        pontos: this.pontos_cad,
        quantidade: this.quantidade_cad,
        valor: this.valor_cad,
        link: this.imagem_nome

        // link_imagem: this.imagem_name,
      }
      const resposta = await axios.put(
        `${this.host}adm_brindes/atualizar/${this.id_novobrinde}`,
        dados,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      const statusResposta = resposta.status
      if (statusResposta === 204) {
        // -------------- salvando imagem do arquivo -----------------
        // -------------- salvando imagem do arquivo -----------------
        if (this.imagem.size > 0) {
          this.anexarImagem()
        }
        // -------------- salvando imagem do arquivo -----------------
        // -------------- salvando imagem do arquivo -----------------

        this.cadBrinde()
        this.showSnackBar('Brinde atualizado com sucesso!', 4000)
        this.exibir_cadastro = false
        this.listaTodosOsBrindes()
      }
    },

    fecharJanela() {
      this.exibir_cadastro = false;
      this.limparCampos();
    },
    limparCampos() {
      this.descricao = "";
      this.imagem_name = "";
      this.imagem = [];
      this.id_brinde = 0;
    },
    async listaTodosOsBrindes() {
      // eslint-disable-next-line no-unused-vars
      const pedidos = await axios.get(`${this.host}adm_brindes/lista-completa`);

      this.lista_brindes = pedidos.data.brindes;
      this.quantidadet = pedidos.data.quantidade;
    },

    async inativarBrinde(brinde) {
      let id = brinde.id_brinde;

      await axios.put(`${this.host}adm_brindes/inativar-brinde/${id}`);
      this.listaTodosOsBrindes();
    },
    async excluirBrinde() {},
    refreshBrindes() {
      this.listaTodosOsBrindes();
    },
    carregarImagem(e) {
      if (e) {
        this.imagem = e;
        this.imagem_name = e.name;
      }
    },
    maiusculasDescricao() {
      this.descricao_cad = this.descricao_cad.toUpperCase();
    },
    showSnackBar(msg, tempo) {
      this.snackbar = true;
      this.texto_snackbar = msg;
      this.timeout = tempo;
    },
  },
};
</script>
