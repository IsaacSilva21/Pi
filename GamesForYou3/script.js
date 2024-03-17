document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("formCadastro");

  if (formulario) {
    // Verifica se o formulário foi encontrado no DOM
    formulario.addEventListener("submit", function (event) {
      event.preventDefault();

      // Seleciona os elementos do formulário
      const Inome = document.querySelector(".nome");
      const Iemail = document.querySelector(".email");
      const Isenha = document.querySelector(".senha");
      const IconfirmarSenha = document.querySelector(".confirmar-senha");
      const Icpf = document.querySelector(".cpf");
      const Inivel = document.querySelector(".nivel");
      const Istatus = document.querySelector(".status");

      // Verifica se as senhas coincidem
      if (Isenha.value !== IconfirmarSenha.value) {
        alert("As senhas não coincidem!");
        return;
      }

      // Monta o objeto com os dados do usuário
      const userData = {
        nome: Inome.value,
        email: Iemail.value,
        senha: Isenha.value,
        cpf: Icpf.value,
        nivel: Inivel.value,
        status: true,
      };

      // Envia os dados para o servidor
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
          // Limpa os campos após o envio bem-sucedido
          limpar();
        })
        .catch(function (error) {
          console.error("Erro ao enviar os dados:", error);
        });
    });

    // Função para limpar os campos do formulário
    function limpar() {
      formulario.reset();
    }
  } else {
    console.error("Formulário não encontrado!");
  }
});
