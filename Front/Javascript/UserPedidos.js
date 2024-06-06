function listarPedidosPorCliente(idCliente) {
  fetch(`http://localhost:8080/pedidos/cliente/${idCliente}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error("Erro ao carregar os pedidos");
      }
      return resposta.json();
    })
    .then(function (pedidos) {
      const listaPedidos = document.getElementById("listaPedidos");
      listaPedidos.innerHTML = "";
      pedidos.forEach(function (pedido) {
        const divPedido = document.createElement("div");
        divPedido.classList.add("pedido");
        divPedido.className = "div-pedido";

        const idPedido = document.createElement("span");
        idPedido.textContent = `Pedido ID: ${pedido.id}`;

        const valorPedido = document.createElement("span");
        valorPedido.textContent = `Valor: ${pedido.valor}`;

        const statusPedido = document.createElement("span");
        statusPedido.textContent = `Status: ${pedido.status}`;

        divPedido.appendChild(idPedido);
        divPedido.appendChild(valorPedido);
        divPedido.appendChild(statusPedido);

        listaPedidos.appendChild(divPedido);
      });
    })
    .catch(function (error) {
      console.error("Erro ao carregar os pedidos:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const idCliente = localStorage.getItem("clienteId");
  listarPedidosPorCliente(idCliente);
});
