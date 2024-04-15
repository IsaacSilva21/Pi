document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  // Fazer uma solicitação AJAX para obter as informações do produto com o ID fornecido
  fetch(`http://localhost:8080/produtos/${id}`)
    .then((response) => response.json())
    .then((produto) => {
      // Preencher os elementos input com as informações do produto
      document.querySelector(".nome").value = produto.nome;
      document.querySelector(".valor").value = produto.valor;
      document.querySelector(".avaliacao").value = produto.avaliacao;
      document.querySelector(".descricao").value = produto.descricao;
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
        img.width = 400;
        img.height = 300;
        fotosDiv.appendChild(img);
      };
    })
    .catch((error) => {
      console.error("Erro ao obter imagem do produto:", error);
    });
});
