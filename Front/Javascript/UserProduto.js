document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  // Função para converter o valor da avaliação para estrelas
  function convertToStars(avaliacao) {
    let stars = "";
    for (let i = 0; i < avaliacao; i++) {
      stars += "⭐"; // Adiciona uma estrela por cada ponto de avaliação
    }
    return stars;
  }

  // Fazer uma solicitação AJAX para obter as informações do produto com o ID fornecido
  fetch(`http://localhost:8080/produtos/${id}`)
    .then((response) => response.json())
    .then((produto) => {
      // Preencher os elementos HTML com as informações do produto
      document.querySelector(".nome").innerText = produto.nome;
      document.querySelector(".valor").innerText = `${produto.valor}`;
      // Converte o valor da avaliação para estrelas
      document.querySelector(".avaliacao").innerText = convertToStars(
        produto.avaliacao
      );
      document.querySelector(".descricao").innerText = produto.descricao;
      document.title = `${produto.nome} 🎮 GFY`;
    })
    .catch((error) => {
      console.error("Erro ao obter informações do produto:", error);
    });

  fetch(`http://localhost:8080/produtos/${id}/imagem`)
    .then((response) => response.blob())
    .then((blob) => {
      // Criar uma URL para a imagem
      const imageUrl = URL.createObjectURL(blob);

      // Criar um elemento <img> para exibir a imagem
      const img = document.createElement("img");
      img.src = imageUrl;

      // Adicionar a imagem à div com a classe .fotos
      const fotosDiv = document.querySelector(".fotos");
      fotosDiv.className = "div-fotos";

      img.onload = function () {
        // Definir a largura e a altura da imagem como 300px
        img.width = 500;
        img.height = 300;
        fotosDiv.appendChild(img);
      };
    })
    .catch((error) => {
      console.error("Erro ao obter imagem do produto:", error);
    });
});

const buttonAdd = document.querySelector(".buttonadd");
buttonAdd.addEventListener("click", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const Inome = document.querySelector(".nome");
  const Ivalor = document.querySelector(".valor");

  fetch(`http://localhost:8080/produtos/${id}/imagem`)
    .then((response) => response.blob())
    .then((blob) => {
      const formData = new FormData();
      formData.append("nome", Inome.textContent);
      formData.append("valor", Ivalor.textContent);
      formData.append("imagem", blob);

      fetch(`http://localhost:8080/carrinho`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            alert("Produto adicionado ao carrinho com sucesso!");
          } else {
            throw new Error("Erro ao adicionar produto ao carrinho");
          }
        })
        .catch((error) => {
          console.error("Erro ao adicionar produto ao carrinho:", error);
          alert("Erro ao adicionar produto ao carrinho");
        });
    })
    .catch((error) => {
      console.error("Erro ao obter imagem do produto:", error);
    });
});
