function listarProdutos() {
  fetch("http://localhost:8080/produtos", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then(function (res) {
      if (!res.ok) {
        throw new Error("Erro ao carregar os produtos");
      }
      return res.json();
    })
    .then(function (produtos) {
      const listaProdutos = document.getElementById("listaProdutos");
      listaProdutos.innerHTML = "";
      produtos.forEach(function (produto) {
        const itemProduto = document.createElement("p");

        const textoStatus = produto.status ? "Ativo" : "Desativado";
        itemProduto.textContent = `${produto.nome} ${produto.descricao} ${produto.preco} ${produto.quantidade}`;

        const btnAlterar = document.createElement("button");
        btnAlterar.textContent = "Alterar";
        btnAlterar.onclick = function () {
          console.log(`Alterar produto ${produto.nome}`);
        };
        itemProduto.appendChild(btnAlterar);

        const btnAtivar = document.createElement("button");
        btnAtivar.textContent = "Ativar";
        btnAtivar.disabled = produto.status;
        btnAtivar.onclick = function () {
          console.log(`Ativar produto ${produto.nome}`);
          btnAtivar.disabled = true;
          btnDesativar.disabled = false;
        };
        itemProduto.appendChild(btnAtivar);

        const btnDesativar = document.createElement("button");
        btnDesativar.textContent = "Desativar";
        btnDesativar.disabled = !produto.status;
        btnDesativar.onclick = function () {
          console.log(`Desativar produto ${produto.nome}`);
          btnAtivar.disabled = false;
          btnDesativar.disabled = true;
        };
        itemProduto.appendChild(btnDesativar);

        listaProdutos.appendChild(itemUsuario);
      });
    })
    .catch(function (error) {
      console.error("Erro ao carregar os usuários:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  listarProdutos();
});
