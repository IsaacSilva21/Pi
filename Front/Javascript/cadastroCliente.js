document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.querySelector(".info form");

  if (formulario) {
    formulario.addEventListener("submit", function (event) {
      event.preventDefault();

      const Inome = document.querySelector(".nome");
      const Iemail = document.querySelector(".email");
      const Isenha = document.querySelector(".senha");
      const Igenero = document.querySelector(".genero");
      const IdataNascimento = document.querySelector("#data");

      const userData = {
        nome: Inome.value,
        email: Iemail.value,
        senha: Isenha.value,
        genero: Igenero.value,
        dataNascimento: IdataNascimento.value,
      };

      // Aqui você pode adicionar a validação das senhas se necessário

      fetch("http://localhost:8080/clientes", {
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
