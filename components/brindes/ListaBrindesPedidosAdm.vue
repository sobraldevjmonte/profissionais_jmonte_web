<template lang="">
  <div class="pl-2 pt-0 ma-0">
    <span class="pt-1">Pedidos de Brinde</span>
    <span class="">(Quant.: {{ quantidadet }})</span>
    <v-divider class="mt-2"></v-divider>
    <v-row align="center" justify="left">
      <v-col cols="1">
        <v-btn
          color="success"
          icon
          class="pt-1 pr-0 mr-0"
          title="Atualizar lista de brindes"
          v-model="filterbrindes"
          @click="refreshPedidos()"
        >
          <v-icon>refresh</v-icon></v-btn
        >
      </v-col>
      <v-col cols="3">
        <v-text-field
          name="name"
          label="Pesquisa pedido..."
          class="text-caption"
          disabled="disabled"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="pb-2"></v-divider>

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
          <th class="black--text text-body-2" width="230px">AÇÕES</th>
          <th class="black--text text-end text-body-2" width="20px">ID</th>
          <th class="black--text text-body-2">DT PEDIDO</th>
          <th class="black--text text-body-2">STATUS PEDIDO</th>
          <th class="black--text text-body-2">PARCEIRO</th>
          <th class="black--text text-body-2">BRINDE SOLICITADO</th>
          <th class="black--text text-end text-body-2">PONTOS</th>
          <th class="black--text text-end text-body-2">ESTOQUE</th>
          <th class="black--text text-left text-body-2">AUTORIZADOR</th>
          <th class="black--text text-left text-body-2">DT AUTORIZAÇÃO</th>
          <th class="black--text text-left text-body-2">DT ENTREGA</th>
          <th class="black--text text-left text-body-2">ENTREGA</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="lista_pedidos_brindes in filtrarBrinde"
          :key="lista_pedidos_brindes.id_premiacao"
        >
          <td class="text-left">
            <v-row>
              <v-btn
                @click="aprovarPedido(lista_pedidos_brindes)"
                style="
                  width: 60px;
                  padding: 5px;
                  margin: 10px;
                  background-color: #fff;
                  color: #000;
                "
                class="text-capitalize ml-1 mr-1 font-weight-light text-center text-caption"
              >
                <!-- <v-icon>check</v-icon> -->
                Aprovar
              </v-btn>
              <v-btn
                @click="rejeitarPedido(lista_pedidos_brindes)"
                style="
                  width: 60px;
                  padding: 5px;
                  margin: 10px;
                  background-color: #a52a2a;
                  color: white;
                "
                class="text-capitalize ml-1 mr-1 font-weight-light text-center text-caption"
              >
                <!-- <v-icon>save</v-icon> -->
                Rejeitar
              </v-btn>
              <v-btn
                @click="entregarPedido(lista_pedidos_brindes)"
                style="
                  width: 60px;
                  padding: 5px;
                  margin: 10px;
                  background-color: #5f9ea0;
                  color: white;
                "
                class="text-capitalize ml-1 mr-1 font-weight-light text-center text-caption"
              >
                <!-- <v-icon>save</v-icon> -->
                Entregar
              </v-btn>
            </v-row>
          </td>
          <td class="font-weight-light text-caption text-end">
            {{ lista_pedidos_brindes.id_premiacao }}
          </td>
          <!-- <td class="pa-1">
              <v-img
                contain
                rounded-circle
                align="center"
                width="30px"
                height="30px"
                aspect-ratio="1/1"
                
                v-bind:src="'img_brindes/' + lista_brindes.imagem"
              />
            </td> -->
          <td class="font-weight-light text-body-2 pt-3 pb-3">
            {{ lista_pedidos_brindes.data_solicitacao }}
          </td>
          <td class="font-weight-light text-body-2">
            <span
              v-if="lista_pedidos_brindes.status === 'REJEITADO'"
              style="color: #b22222"
              class="font-weight-bold"
            >
              {{ lista_pedidos_brindes.status }}</span
            >
            <span
              v-else-if="lista_pedidos_brindes.status === 'APROVADO'"
              style="color: #000080"
              class="font-weight-bold"
              >{{ lista_pedidos_brindes.status }}</span
            >
            <span
              v-else-if="lista_pedidos_brindes.status === 'ENTREGUE'"
              style="color: #228b22"
              class="font-weight-bold"
              >{{ lista_pedidos_brindes.status }}</span
            >
            <span v-else class="font-weight-bold">{{
              lista_pedidos_brindes.status
            }}</span>
          </td>
          <td class="font-weight-light text-body-2">
            {{ lista_pedidos_brindes.nome_parceiro }}
          </td>
          <td class="font-weight-light text-body-2">
            {{ lista_pedidos_brindes.descricao_brinde }}
          </td>
          <td class="font-weight-light text-end text-body-2">
            {{ lista_pedidos_brindes.pontos_brinde }}
          </td>
          <td class="font-weight-light text-end text-body-2">
            {{ lista_pedidos_brindes.estoque }}
          </td>
          <td class="font-weight-light text-left text-body-2">
            {{ lista_pedidos_brindes.nome_autorizador }}
          </td>
          <td class="font-weight-light text-left text-body-2">
            {{ lista_pedidos_brindes.data_autorizacao }}
          </td>
          <td class="font-weight-light text-left text-body-2">
            {{ lista_pedidos_brindes.data_entrega }}
          </td>
          <td class="font-weight-light text-left text-body-2">
            {{ lista_pedidos_brindes.nome_entregador }}
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
      snackbar: false,

      texto_snackbar: "",
      timeout: -1,

      lista_pedidos_brindes: [],
      descricao_brinde: "",
      id_premio: 0,
      pontos_brinde: 0,
      estoque: 0,
      nome_parceiro: "",
      nome_autorizador: "",
      nome_entregador: "",
      id_premiacao: 0,
      id_parceiro: 0,
      id_autorizador: 0,
      data_solicitacao: "",
      data_autorizacao: "",
      autorizado: false,
      status: "",
      entregue: false,
      data_entrega: "",

      imagem_nome: "",
      imagemKey: 0,
      quantidadet: 0,

      operacao: "",
      filterbrindes: "",
      link_cad: "",

      idUsuario: 999999,
      nomeUsuario: "",
    };
  },
  computed: {
    filtrarBrinde() {
      if (this.filterbrindes) {
        const fil = this.filterbrindes.toUpperCase();
        return this.lista_pedidos_brindes.filter((cli) => {
          return cli.descricao.toUpperCase().includes(fil);
        });
      } else {
        return this.lista_pedidos_brindes;
      }
    },
  },
  mounted() {
    this.listaTodosOsPedidosBrindes();
    this.getLogado();
  },

  methods: {
    getLogado() {
      this.idUsuario = sessionStorage.getItem("idUsuario");
      this.nomeUsuario = sessionStorage.getItem("nomeUsuario");
    },
    async listaTodosOsPedidosBrindes() {
      // eslint-disable-next-line no-unused-vars
      const pedidos = await axios.get(
        `${this.host}adm_brindes/listar-pedidos-brindes`
      );
      console.log(pedidos.data);

      this.lista_pedidos_brindes = pedidos.data.pedidos;
      this.quantidadet = pedidos.data.quantidade;
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

    async rejeitarPedido(pedido) {
      let id = pedido.id_premiacao;
      let id_parceiro = pedido.id_parceiro;
      let status = pedido.status;

      if (status == "ENTREGUE") {
        this.showSnackBar(
          "Não é possíve REJEITAR. O pedido já foi entregue.",
          20000
        );
        return;
      }

      if (status == "REJEITADO") {
        this.showSnackBar("Não é possíve REJEITAR novamente.", 20000);
        return;
      }

      if (status == "PENDENTE" || status == "APROVADO") {
        await axios.post(
          `${this.host}adm_brindes/rejeitar-pedido/${id}/${id_parceiro}`
        );
        this.showSnackBar("Pedido REJEITADO com sucesso.", 20000);
      }

      this.listaTodosOsPedidosBrindes();
    },

    async aprovarPedido(pedido) {
      let status = pedido.status;
      let id = pedido.id_premiacao;
      let idAutorizador = this.idUsuario;

      if (status == "REJEITADO") {
        this.showSnackBar(
          "Não é possíve aprovar. O pedido foi REJEITADO!",
          20000
        );
        return;
      }

      if (status == "ENTREGUE") {
        this.showSnackBar(
          "Não é possíve aprovar. O pedido foi entregue!",
          20000
        );
        return;
      }
      if (status == "APROVADO") {
        this.showSnackBar("Pedido já foi APROVADO.", 20000);
        return;
      }

      if (status == "PENDENTE" || status == "REJEITADO") {
        await axios.post(
          `${this.host}adm_brindes/aprovar-pedido/${id}/${idAutorizador}`
        );
        this.showSnackBar("Pedido APROVADO com sucesso.", 20000);
      }

      this.listaTodosOsPedidosBrindes();
    },

    async entregarPedido(pedido) {
      let status = pedido.status;
      let id_premio = pedido.id_premio;
      let idEntregador = this.idUsuario;

      if (status == "REJEITADO") {
        this.showSnackBar(
          "Não é possíve entregar. O pedido foi rejeitado!",
          20000
        );
        return;
      }
      if (status == "ENTREGUE") {
        this.showSnackBar("Não é possíve entregar novamente.", 20000);
        return;
      }
      if (status == "PENDENTE") {
        this.showSnackBar("Pedido ainda não foi APROVADO.", 2000);
      }

      if (status == "APROVADO") {
        let id = pedido.id_premiacao;
        let resposta = await axios.post(
          `${this.host}adm_brindes/entregar-pedido/${id}/${id_premio}/${idEntregador}`
        );
        const statusResposta = resposta.status;
        if (statusResposta === 200) {
          this.showSnackBar("Pedido entregue com sucesso.", 10000);
          this.listaTodosOsPedidosBrindes();
        } else {
          this.showSnackBar("Saldo insuficiente em estoque.", 20000);
        }
      }
    },

    refreshPedidos() {
      this.listaTodosOsPedidosBrindes();
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
