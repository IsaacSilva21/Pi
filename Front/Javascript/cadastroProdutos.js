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

function previewButton() {
  var fileInput = document.getElementById("imagemInput");
  var imagensContainer = document.getElementById("preview");
  var files = fileInput.files;

  for (var i = 0; i < files.length; i++) {
    (function (index) {
      if (index < 3) {
        var file = files[index];
        var reader = new FileReader();

        reader.onload = function (e) {
          var divImage = document.createElement("div");
          var divCheck = document.createElement("div");
          var divLabel = document.createElement("div");
          var divTodos = document.createElement("div");
          divTodos.className = "div-todos";
          divCheck.className = "div-check";
          divLabel.className = "div-label";
          var img = document.createElement("img");
          img.style.maxWidth = "200px";
          img.style.maxHeight = "200px";
          img.src = e.target.result;

          var checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.className = "imagem-checkbox";
          checkbox.id = "checkbox_" + index; // Adicionando um id único para cada checkbox
          checkbox.addEventListener("click", function () {
            var checkboxes = document.querySelectorAll(".imagem-checkbox");
            checkboxes.forEach(function (cb) {
              if (cb !== this) cb.checked = false;
            }, this);
          });

          var label = document.createElement("label");
          label.textContent = "Principal"; // Texto da label
          label.setAttribute("for", "checkbox_" + index); // Associando a label ao checkbox

          var removerBtn = document.createElement("button");
          removerBtn.textContent = "Remover";
          removerBtn.className = "remover-btn";
          removerBtn.addEventListener("click", function () {
            imagensContainer.removeChild(divTodos);
          });
          divImage.appendChild(img);
          divLabel.appendChild(checkbox);
          divLabel.appendChild(label); // Adicionando a label ao divCheck
          divCheck.appendChild(divLabel);
          divCheck.appendChild(removerBtn);
          divTodos.appendChild(divImage);
          divTodos.appendChild(divCheck);
          imagensContainer.appendChild(divTodos);
        };

        reader.readAsDataURL(file);
      } else {
        console.warn("Apenas três imagens podem ser adicionadas.");
      }
    })(i);
  }
}
