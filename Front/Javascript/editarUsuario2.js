const form = document.getElementById("formCadastro");

function getUserIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

const userId = getUserIdFromUrl();

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = {
    nome: form.nome.value,
    cpf: form.cpf.value,
    senha: form.senha.value,
    nivel: form.nivel.value,
  };

  const userId = getUserIdFromUrl();

  fetch(`http://localhost:8080/usuarios/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
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
