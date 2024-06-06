function listarPedidos() {
  fetch("http://localhost:8080/pedidos", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then(function (res) {
      if (!res.ok) {
        throw new Error("Erro ao carregar os pedidos");
      }
      return res.json();
    })
    .then(function (pedidos) {
      const listaPedidos = document.getElementById("listaPedidos");
      listaPedidos.innerHTML = "";

      pedidos.forEach(function (pedido) {
        const divPedidos = document.createElement("div");
        divPedidos.className = "div-Pedidos";

        const textoNivel = pedido.metodopag === 1 ? "Boleto" : "Cartão";

        const pIdCliente = document.createElement("span");
        pIdCliente.textContent = `${pedido.idcliente}`;
        const pId = document.createElement("span");
        pId.textContent = `${pedido.id}`;
        const pValor = document.createElement("span");
        pValor.textContent = `${pedido.valor}`;
        const pPag = document.createElement("span");
        pPag.textContent = `${textoNivel}`;

        const pNivel = document.createElement("select");
        const opcoes = [
          { texto: "Aguardando Pagamento", valor: "Aguardando Pagamento" },
          { texto: "Pagamento Confirmado", valor: "Pagamento Confirmado" },
          { texto: "Entregue", valor: "Entregue" },
        ];

        // Adiciona cada opção ao <select>
        opcoes.forEach((opcao) => {
          const option = document.createElement("option");
          option.text = opcao.texto;
          option.value = opcao.valor;
          if (pedido.status === opcao.valor) {
            option.selected = true;
          }
          pNivel.add(option);
        });

        // Adicionar evento de mudança para atualizar o status
        pNivel.addEventListener("change", function () {
          const novoStatus = this.value;
          fetch(`http://localhost:8080/pedidos/${pedido.id}/status`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: novoStatus }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Erro ao atualizar o status");
              }
              return response.json();
            })
            .then((data) => {
              console.log("Status atualizado:", data);
              listarPedidos();
            })
            .catch((error) => {
              console.error("Erro:", error);
            });
        });

        divPedidos.appendChild(pIdCliente);
        divPedidos.appendChild(pId);
        divPedidos.appendChild(pValor);
        divPedidos.appendChild(pPag);
        divPedidos.appendChild(pNivel);

        listaPedidos.appendChild(divPedidos);
      });
    })
    .catch(function (error) {
      console.error("Erro ao carregar os pedidos:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  listarPedidos();
});
