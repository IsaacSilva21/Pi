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

      
      Icpf.classList.remove("input-error");

      if (!isValidCPF(Icpf.value)) {
        alert("CPF inválido!");
        Icpf.classList.add("input-error");
        return;
      }

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
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Erro na resposta do servidor");
          }
        })
        .then(function (cliente) {
          limpar();
          window.location.href = `UserEndereco.html?id=${cliente.id}`;
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

  function isValidCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, "");

    if (cpf.length !== 11) {
      return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let firstVerifier = 11 - (sum % 11);
    if (firstVerifier === 10 || firstVerifier === 11) {
      firstVerifier = 0;
    }

    if (firstVerifier !== parseInt(cpf.charAt(9))) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let secondVerifier = 11 - (sum % 11);
    if (secondVerifier === 10 || secondVerifier === 11) {
      secondVerifier = 0;
    }

    return secondVerifier === parseInt(cpf.charAt(10));
  }
});
