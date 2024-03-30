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
        divProduto.className = "div-produto";

        const divButtons = document.createElement("div");
        divButtons.className = "div-buttons";
        const divAlterar = document.createElement("div");
        divAlterar.className = "div-alterar";

        const id = document.createElement("span");
        id.textContent = `${produto.id}`;
        divProduto.appendChild(id);

        const nomeProduto = document.createElement("span");
        nomeProduto.textContent = `${produto.nome}`;
        divProduto.appendChild(nomeProduto);
        nomeProduto.style.cursor = "pointer";
        nomeProduto.addEventListener("click", function () {
          window.location.href = "telaProduto.html";
        });

        const descricaoProduto = document.createElement("span");
        descricaoProduto.textContent = `${produto.descricao}`;
        divProduto.appendChild(descricaoProduto);

        const precoProduto = document.createElement("span");
        precoProduto.textContent = `${produto.preco}`;
        divProduto.appendChild(precoProduto);

        const quantidadeProduto = document.createElement("span");
        quantidadeProduto.textContent = `${produto.quantidade}`;
        divProduto.appendChild(quantidadeProduto);

        const statusProduto = document.createElement("span");
        statusProduto.textContent = `${
          produto.status ? "Ativo" : "Desativado"
        }`;
        divProduto.appendChild(statusProduto);

        const btnAlterar = document.createElement("button");
        btnAlterar.textContent = "Alterar";
        btnAlterar.onclick = function () {
          console.log(`Alterar produto ${produto.nome}`);
        };
        divAlterar.appendChild(btnAlterar);
        divProduto.appendChild(divAlterar);

        const btnAtivar = document.createElement("button");
        btnAtivar.textContent = "Ativar";
        btnAtivar.disabled = produto.status;
        btnAtivar.onclick = function () {
          console.log(`Ativar produto ${produto.nome}`);
          btnAtivar.disabled = true;
          btnDesativar.disabled = false;
        };
        divButtons.appendChild(btnAtivar);

        const btnDesativar = document.createElement("button");
        btnDesativar.textContent = "Desativar";
        btnDesativar.disabled = !produto.status;
        btnDesativar.onclick = function () {
          console.log(`Desativar produto ${produto.nome}`);
          btnAtivar.disabled = false;
          btnDesativar.disabled = true;
        };
        divButtons.appendChild(btnDesativar);
        divProduto.appendChild(divButtons);

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
