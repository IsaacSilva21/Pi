function listarProdutos() {
  fetch("http://localhost:8080/produtos", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error("Erro ao carregar os produtos");
      }
      return resposta.json();
    })
    .then(function (produtos) {
      const listaProdutos = document.getElementById("listaProdutos");
      listaProdutos.innerHTML = "";
      produtos.forEach(function (produto) {
        const divProduto = document.createElement("div");
        divProduto.classList.add("produto");

        const nomeProduto = document.createElement("p");
        nomeProduto.textContent = `Nome: ${produto.nome}`;
        divProduto.appendChild(nomeProduto);

        const descricaoProduto = document.createElement("p");
        descricaoProduto.textContent = `Descrição: ${produto.descricao}`;
        divProduto.appendChild(descricaoProduto);

        const precoProduto = document.createElement("p");
        precoProduto.textContent = `Preço: ${produto.preco}`;
        divProduto.appendChild(precoProduto);

        const quantidadeProduto = document.createElement("p");
        quantidadeProduto.textContent = `Quantidade: ${produto.quantidade}`;
        divProduto.appendChild(quantidadeProduto);

        const statusProduto = document.createElement("p");
        statusProduto.textContent = `Status: ${
          produto.status ? "Ativo" : "Desativado"
        }`;
        divProduto.appendChild(statusProduto);

        const btnAlterar = document.createElement("button");
        btnAlterar.textContent = "Alterar";
        btnAlterar.onclick = function () {
          console.log(`Alterar produto ${produto.nome}`);
        };
        divProduto.appendChild(btnAlterar);

        const btnAtivar = document.createElement("button");
        btnAtivar.textContent = "Ativar";
        btnAtivar.disabled = produto.status;
        btnAtivar.onclick = function () {
          console.log(`Ativar produto ${produto.nome}`);
          btnAtivar.disabled = true;
          btnDesativar.disabled = false;
        };
        divProduto.appendChild(btnAtivar);

        const btnDesativar = document.createElement("button");
        btnDesativar.textContent = "Desativar";
        btnDesativar.disabled = !produto.status;
        btnDesativar.onclick = function () {
          console.log(`Desativar produto ${produto.nome}`);
          btnAtivar.disabled = false;
          btnDesativar.disabled = true;
        };
        divProduto.appendChild(btnDesativar);

        listaProdutos.appendChild(divProduto);
      });
    })
    .catch(function (error) {
      console.error("Erro ao carregar os produtos:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  listarProdutos();
});
