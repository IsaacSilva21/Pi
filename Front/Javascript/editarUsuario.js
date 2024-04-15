document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const usuarioId = urlParams.get("id");

  // Fazer uma solicitação AJAX para obter as informações do usuário com o ID fornecido
  fetch(`http://localhost:8080/usuarios/${usuarioId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao obter informações do usuário");
      }
      return response.json();
    })
    .then((usuario) => {
      document.querySelector(".nome").value = usuario.nome;
      document.querySelector(".cpf").value = usuario.cpf;
      document.querySelector(".senha").value = usuario.senha;
      document.querySelector(".email").value = usuario.email;
      document.querySelector(".status").value = usuario.status;
      document.querySelector(".nivel").value = usuario.nivel;
    })
    .catch((error) => {
      console.error("Erro ao obter informações do usuário:", error);
    });

  document.querySelector("#botaoEditar").addEventListener("click", function () {
    const nome = document.querySelector(".nome").value;
    const email = document.querySelector(".email").value;
    const cpf = document.querySelector(".cpf").value;
    const senha = document.querySelector(".senha").value;
    const nivel = document.querySelector(".nivel").value;
    const status = document.querySelector(".status").value;

    // Criando um objeto com os dados do usuário
    const usuario = {
      nome: nome,
      email: email,
      cpf: cpf,
      senha: senha,
      nivel: nivel,
      status: status,
    };

    fetch(`http://localhost:8080/usuarios/${usuarioId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao editar usuário");
        }
        console.log("Usuário editado com sucesso!");
        window.location.href = "listUsuarios.html";
      })
      .catch((error) => {
        console.error("Erro ao editar usuário:", error);
      });
  });
});
