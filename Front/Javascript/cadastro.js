document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formCadastro");

  if (formulario) {
    formulario.addEventListener("submit", function (event) {
      event.preventDefault();

      const Inome = document.querySelector(".nome");
      const Iemail = document.querySelector(".email");
      const Isenha = document.querySelector(".senha");
      const IconfirmarSenha = document.querySelector(".confirmar-senha");
      const Icpf = document.querySelector(".cpf");
      const Inivel = document.querySelector(".nivel");
      const Istatus = document.querySelector(".status");

      if (Isenha.value !== IconfirmarSenha.value) {
        alert("As senhas não coincidem!");
        return;
      }

      const userData = {
        nome: Inome.value,
        email: Iemail.value,
        senha: Isenha.value,
        cpf: Icpf.value,
        nivel: Inivel.value,
        status: true,
      };

      fetch("http://localhost:8080/usuarios", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      })
        .then(function (res) {
          console.log(res);
          window.location.href = "listUsuarios.html";
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
