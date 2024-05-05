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

        const pNome = document.createElement("span");
        pNome.textContent = `${carrinhoItem.nome}`;

        const pValor = document.createElement("span");
        pValor.textContent = `${carrinhoItem.valor}`;

        totalValor += parseFloat(carrinhoItem.valor);

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

        divCarrinho.appendChild(img);
        divCarrinho.appendChild(pNome);
        divCarrinho.appendChild(pValor);

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

document.addEventListener("DOMContentLoaded", function () {
  listarCarrinho();
});
