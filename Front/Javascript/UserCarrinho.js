document.addEventListener("DOMContentLoaded", function () {
  listarCarrinho();
});

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
        pNome.id = "pNome";

        const pValor = document.createElement("span");
        pValor.textContent = `R$${carrinhoItem.valor}`;

        const pQuantidade = document.createElement("span");
        pQuantidade.textContent = `${carrinhoItem.quantidade}`;
        pQuantidade.className = "quantidade";
        pQuantidade.id = "pQuantidade";

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

       
        const btnMais = document.createElement("button");
        btnMais.textContent = "+";
        btnMais.className = "btnMais";
        btnMais.addEventListener("click", function () {
          atualizarQuantidade(carrinhoItem.id, carrinhoItem.quantidade + 1);
        });

        
        const btnMenos = document.createElement("button");
        btnMenos.textContent = "-";
        btnMenos.className = "btnMenos";
        btnMenos.addEventListener("click", function () {
          if (carrinhoItem.quantidade > 1) {
            atualizarQuantidade(carrinhoItem.id, carrinhoItem.quantidade - 1);
          }
        });

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
      totalElement.id = "totalValor";
      totalElement.textContent = `Total: R$ ${totalValor.toFixed(2)}`;

      const freteDiv = document.createElement("div");
      freteDiv.className = "frete";
      freteDiv.innerHTML = `
        <label for="cep">Digite seu CEP:</label>
        <input type="text" id="cep" name="cep">
        <button class="buttoncalc">Calcular Frete</button>
        <p id="resultadoFrete"></p>
        <p id="endereco"></p>
        <div id="opcoesFrete"></div>
      `;
      listaCarrinho.appendChild(freteDiv);
      listaCarrinho.appendChild(totalElement);

      
      document
        .querySelector(".buttoncalc")
        .addEventListener("click", function () {
          calcularFrete(totalValor);
        });
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

function calcularFrete(totalValor) {
  const cepInput = document.getElementById("cep");
  const resultadoFrete = document.getElementById("resultadoFrete");
  const enderecoDisplay = document.getElementById("endereco");
  const opcoesFrete = document.getElementById("opcoesFrete");
  const totalElement = document.getElementById("totalValor");
  const cep = cepInput.value;

  if (cep === "") {
    resultadoFrete.textContent = "Por favor, insira um CEP.";
    return;
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then((response) => response.json())
    .then((data) => {
      if (data.erro) {
        enderecoDisplay.textContent = "CEP inválido.";
        return;
      }

      enderecoDisplay.textContent = `Endereço: ${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;

      const freteEconomico = (Math.random() * (30 - 10) + 10).toFixed(2);
      const freteNormal = (Math.random() * (40 - 20) + 20).toFixed(2);
      const freteExpresso = (Math.random() * (50 - 30) + 30).toFixed(2);

      const prazoEconomico = 7; 
      const prazoNormal = 5; 
      const prazoExpresso = 3; 

      opcoesFrete.innerHTML = `
        <label for="freteOptions">Escolha a opção de frete:</label>
        <select id="freteOptions">
          <option value="${freteEconomico}" data-prazo="${prazoEconomico}">Frete Econômico: R$ ${freteEconomico} (Até ${prazoEconomico} dias)</option>
          <option value="${freteNormal}" data-prazo="${prazoNormal}">Frete Normal: R$ ${freteNormal} (Até ${prazoNormal} dias)</option>
          <option value="${freteExpresso}" data-prazo="${prazoExpresso}">Frete Expresso: R$ ${freteExpresso} (Até ${prazoExpresso} dias)</option>
        </select>
      `;

      const freteOptions = document.getElementById("freteOptions");
      freteOptions.addEventListener("change", function () {
        const selectedFrete = parseFloat(freteOptions.value);
        const selectedPrazo = freteOptions.options[freteOptions.selectedIndex].dataset.prazo;
        const totalComFrete = (parseFloat(totalValor) + selectedFrete).toFixed(2);

        resultadoFrete.innerHTML = `O valor do frete selecionado é R$ ${selectedFrete.toFixed(2)} e o prazo é de até ${selectedPrazo} dias.`;
        totalElement.textContent = `Total: R$ ${totalComFrete}`;

        const itemValue = totalComFrete;
        const pNome = document.getElementById("pNome");
        const pQuantidade = document.getElementById("pQuantidade");
        localStorage.setItem("precoCarrinho", itemValue);
        localStorage.setItem("nomeProduto", pNome.textContent);
        localStorage.setItem("quantidadePro", pQuantidade.textContent);
      });

      freteOptions.dispatchEvent(new Event('change'));
    })
    .catch((error) => {
      console.error("Erro ao buscar o endereço:", error);
      enderecoDisplay.textContent = "Erro ao buscar o endereço. Tente novamente mais tarde.";
    });
}
