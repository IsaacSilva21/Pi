document.addEventListener("DOMContentLoaded", function () {
  const loggedIn = localStorage.getItem("loggedIn");

  if (!loggedIn) {
    window.location.href = "/Front/Html/UserLogin.html";
  } else {
    const idCliente = localStorage.getItem("clienteId");
    listarEnderecosPorCliente(idCliente);
  }

  function listarEnderecosPorCliente(idCliente) {
    fetch(`http://localhost:8080/endereco/cliente/${idCliente}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(function (resposta) {
        if (!resposta.ok) {
          throw new Error("Erro ao carregar os endereços");
        }
        return resposta.json();
      })
      .then(function (enderecos) {
        const listaEnderecos = document.getElementById("listaEnderecos");
        listaEnderecos.innerHTML = "";
        enderecos.forEach(function (endereco) {
          const divEndereco = document.createElement("div");
          divEndereco.classList.add("endereco");
          divEndereco.className = "div-endereco";
          divEndereco.style.cursor = "pointer";
          divEndereco.addEventListener("click", function () {
            localStorage.setItem("cepEndereco", endereco.cep);
            localStorage.setItem("logradouro", endereco.logradouro);
            localStorage.setItem("numero", endereco.numero);
            localStorage.setItem("bairro", endereco.bairro);
            localStorage.setItem("cidade", endereco.cidade);
            localStorage.setItem("uf", endereco.uf);

            window.location.href = "UserCheck.html";
          });

          const cepEndereco = document.createElement("span");
          cepEndereco.textContent = `${endereco.cep}`;

          const divRuaNum = document.createElement("div");
          const ruaEndereco = document.createElement("span");
          ruaEndereco.textContent = `${endereco.logradouro}`;
          ruaEndereco.classList.add("rua-endereco");
          divRuaNum.appendChild(ruaEndereco);

          const cepNumero = document.createElement("span");
          cepNumero.textContent = `${endereco.numero}`;
          divRuaNum.appendChild(cepNumero);

          const bairroEndereco = document.createElement("span");
          bairroEndereco.textContent = `${endereco.bairro}`;

          const divCidUf = document.createElement("div");
          const cidadeEndereco = document.createElement("span");
          cidadeEndereco.textContent = `${endereco.cidade}`;
          divCidUf.appendChild(cidadeEndereco);

          const ufEndereco = document.createElement("span");
          ufEndereco.textContent = `${endereco.uf}`;
          divCidUf.appendChild(ufEndereco);

          divEndereco.appendChild(cepEndereco);
          divEndereco.appendChild(divRuaNum);
          divEndereco.appendChild(bairroEndereco);
          divEndereco.appendChild(divCidUf);

          listaEnderecos.appendChild(divEndereco);
        });
      })
      .catch(function (error) {
        console.error("Erro ao carregar os endereços:", error);
      });
  }
});
