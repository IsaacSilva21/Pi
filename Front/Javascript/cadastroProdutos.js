document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formCadastro");

  if (formulario) {
    formulario.addEventListener("submit", function (event) {
      event.preventDefault();

      const Inome = document.querySelector(".nome");
      const Idescricao = document.querySelector(".descricao");
      const Ipreco = document.querySelector(".preco");
      const Iquantidade = document.querySelector(".quantidade");

      const userData = {
        nome: Inome.value,
        descricao: Idescricao.value,
        preco: Ipreco.value,
        quantidade: Iquantidade.value,
      };

      fetch("http://localhost:8080/produtos", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      })
        .then(function (res) {
          console.log(res);

          limpar();
        })
        .catch(function (error) {
          console.error("Erro ao enviar os dados:", error);
        });
    });

    function limpar() {
      formulario.reset();
    }
  } else {
    console.error("Formulário não encontrado!");
  }
});

function previewImage() {
  var fileInput = document.getElementById("imagemInput");
  var preview = document.getElementById("preview");

  var file = fileInput.files[0];
  var reader = new FileReader();

  reader.onload = function (e) {
    var img = document.createElement("img");
    img.style.maxWidth = "100%";
    img.style.maxHeight = "100%";
    img.src = e.target.result;
    preview.innerHTML = "";
    preview.appendChild(img);
  };

  reader.readAsDataURL(file);
}
