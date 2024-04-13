document.addEventListener("DOMContentLoaded", function () {
  fetch(`http://localhost:8080/produtos`)
    .then((response) => response.json())
    .then((produto) => {
      document.querySelector(".nome").value = produto.nomee;
      document.querySelector(".valor").value = produto.valor;
    })
    .catch((error) => {
      console.error("Erro ao obter informações do produto:", error);
    });

  fetch(`http://localhost:8080/produtos/imagem`)
    .then((response) => response.blob())
    .then((blob) => {
      const imageUrl = URL.createObjectURL(blob);

      const img = document.createElement("img");
      img.src = imageUrl;

      const fotosDiv = document.querySelector(".fotos");
      fotosDiv.className = "div-fotos";

      img.onload = function () {
        fotosDiv.appendChild(img);
      };
    })
    .catch((error) => {
      console.error("Erro ao obter imagem do produto:", error);
    });
});
