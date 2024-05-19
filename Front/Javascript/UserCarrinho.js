function listarCarrinho() {
  let totalValor = 0;

  fetch("http://localhost:8080/carrinho", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then(function (res) {
      if (!res.ok) {
        throw new Error("Erro ao carregar o carrinho");
      }
      return res.json();
    })
    .then(function (carrinhoItens) {
      const listaCarrinho = document.getElementById("listaCarrinho");
      listaCarrinho.innerHTML = "";

      carrinhoItens.forEach(function (carrinhoItem) {
        const divCarrinho = document.createElement("div");
        divCarrinho.className = "div-carrinho";

        const divQuantidade = document.createElement("div");
        divQuantidade.className = "div-quantidade";

        const pNome = document.createElement("span");
        pNome.textContent = `${carrinhoItem.nome}`;

        const pValor = document.createElement("span");
        pValor.textContent = `R$${carrinhoItem.valor}`;

        const pQuantidade = document.createElement("span");
        pQuantidade.textContent = `${carrinhoItem.quantidade}`;
        pQuantidade.className = "quantidade";

        totalValor += parseFloat(carrinhoItem.valor) * carrinhoItem.quantidade;

        const img = document.createElement("img");

        fetch(`http://localhost:8080/carrinho/${carrinhoItem.id}/imagem`)
          .then((response) => response.blob())
          .then((blob) => {
            const imageUrl = URL.createObjectURL(blob);
            img.src = imageUrl;

            img.width = 200;
            img.height = 100;
          })
          .catch((error) => {
            console.error("Erro ao obter imagem do produto:", error);
          });

        // Botão Mais
        const btnMais = document.createElement("button");
        btnMais.textContent = "+";
        btnMais.className = "btnMais";
        btnMais.addEventListener("click", function () {
          atualizarQuantidade(carrinhoItem.id, carrinhoItem.quantidade + 1);
        });

        // Botão Menos
        const btnMenos = document.createElement("button");
        btnMenos.textContent = "-";
        btnMenos.className = "btnMenos";
        btnMenos.addEventListener("click", function () {
          if (carrinhoItem.quantidade > 1) {
            atualizarQuantidade(carrinhoItem.id, carrinhoItem.quantidade - 1);
          }
        });

        // Botão Deletar
        const btnDeletar = document.createElement("button");
        btnDeletar.textContent = "X";
        btnDeletar.className = "btnDeletar";
        btnDeletar.addEventListener("click", function () {
          deletarItem(carrinhoItem.id);
        });

        divCarrinho.appendChild(img);
        divCarrinho.appendChild(pNome);
        divCarrinho.appendChild(pValor);
        divQuantidade.appendChild(btnMais);
        divQuantidade.appendChild(pQuantidade);
        divQuantidade.appendChild(btnMenos);
        divCarrinho.appendChild(divQuantidade);
        divCarrinho.appendChild(btnDeletar);

        listaCarrinho.appendChild(divCarrinho);
      });

      const totalElement = document.createElement("div");
      totalElement.className = "total-valor";
      totalElement.textContent = `Total: R$ ${totalValor.toFixed(2)}`;
      listaCarrinho.appendChild(totalElement);
    })
    .catch(function (error) {
      console.error("Erro ao carregar o carrinho:", error);
    });
}

function atualizarQuantidade(id, quantidade) {
  fetch(`http://localhost:8080/carrinho/${id}/quantidade`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({ quantidade: quantidade }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erro ao atualizar a quantidade do item");
      }
      listarCarrinho();
    })
    .catch((error) => {
      console.error("Erro ao atualizar a quantidade do item:", error);
    });
}

function deletarItem(id) {
  fetch(`http://localhost:8080/carrinho/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Erro ao deletar o item");
      }
      listarCarrinho();
    })
    .catch((error) => {
      console.error("Erro ao deletar o item:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  listarCarrinho();
});
