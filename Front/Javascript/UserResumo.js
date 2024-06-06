function getUltimoPedido() {
  fetch("http://localhost:8080/pedidos/ultimo", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Erro ao carregar o último pedido");
      }
      return response.json();
    })
    .then(function (ultimoPedido) {
      const listaPedidos = document.getElementById("listaPedidos");
      listaPedidos.innerHTML = "";

      const divPedido = document.createElement("div");
      divPedido.classList.add("pedido");
      divPedido.className = "div-pedido";

      const idPedido = document.createElement("span");
      idPedido.textContent = `Pedido ID: ${ultimoPedido.id}`;

      const valorPedido = document.createElement("span");
      valorPedido.textContent = `Valor: ${ultimoPedido.valor}`;

      const nomeProduto = document.createElement("span");
      nomeProduto.textContent = `Produto: ${ultimoPedido.nomeproduto}`;

      const quantidade = document.createElement("span");
      quantidade.textContent = `Quantidade: ${ultimoPedido.quantidade}`;

      const cep = document.createElement("span");
      cep.textContent = `CEP: ${ultimoPedido.cep}`;

      const logradouro = document.createElement("span");
      logradouro.textContent = `Logradouro: ${ultimoPedido.logradouro}`;

      const numero = document.createElement("span");
      numero.textContent = `Número: ${ultimoPedido.numero}`;

      const bairro = document.createElement("span");
      bairro.textContent = `Bairro: ${ultimoPedido.bairro}`;

      const cidade = document.createElement("span");
      cidade.textContent = `Cidade: ${ultimoPedido.cidade}`;

      const uf = document.createElement("span");
      uf.textContent = `UF: ${ultimoPedido.uf}`;

      const statusPedido = document.createElement("span");
      statusPedido.textContent = `Status: ${ultimoPedido.status}`;

      divPedido.appendChild(idPedido);
      divPedido.appendChild(valorPedido);
      divPedido.appendChild(nomeProduto);
      divPedido.appendChild(quantidade);
      divPedido.appendChild(cep);
      divPedido.appendChild(logradouro);
      divPedido.appendChild(numero);
      divPedido.appendChild(bairro);
      divPedido.appendChild(cidade);
      divPedido.appendChild(uf);
      divPedido.appendChild(statusPedido);

      listaPedidos.appendChild(divPedido);
    })
    .catch(function (error) {
      console.error("Erro ao carregar os pedidos:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  getUltimoPedido();
});
