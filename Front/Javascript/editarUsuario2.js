document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formCadastro");

  function getUserIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  }

  const userId = getUserIdFromUrl();

  fetch(`http://localhost:8080/usuarios/${userId}`)
    .then((response) => response.json())
    .then((usuario) => {
      document.querySelector(".nome").value = usuario.nome;
      document.querySelector(".cpf").value = usuario.cpf;
      document.querySelector(".nivel").value = usuario.nivel;
    })
    .catch((error) => {
      console.error("Erro ao obter informações do usuário:", error);
    });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
      nome: form.nome.value,
      cpf: form.cpf.value,
      senha: form.senha.value,
      nivel: form.nivel.value,
    };

    fetch(`http://localhost:8080/usuarios/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "listUsuarios.html";
          return response.json();
        } else {
          throw new Error("Erro na solicitação: " + response.statusText);
        }
      })
      .then((data) => {
        console.log("Usuário atualizado:", data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  });
});
