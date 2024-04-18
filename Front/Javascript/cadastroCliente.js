document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formCadastro");

  if (formulario) {
    formulario.addEventListener("submit", function (event) {
      event.preventDefault();

      const Inome = document.querySelector(".nome");
      const Iemail = document.querySelector(".email");
      const Icpf = document.querySelector(".cpf");
      const Isenha = document.querySelector(".senha");
      const Igenero = document.querySelector(".genero");
      const Idata = document.querySelector(".data");

      const userData = {
        nome: Inome.value,
        email: Iemail.value,
        cpf: Icpf.value,
        senha: Isenha.value,
        genero: Igenero.value,
        data: Idata.value,
      };
      fetch("http://localhost:8080/clientes", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(userData),
      })
        .then(function (res) {
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
