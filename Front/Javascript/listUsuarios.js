function listarUsuarios() {
  fetch("http://localhost:8080/usuarios", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then(function (res) {
      if (!res.ok) {
        throw new Error("Erro ao carregar os usuários");
      }
      return res.json();
    })
    .then(function (usuarios) {
      const listaUsuarios = document.getElementById("listaUsuarios");
      listaUsuarios.innerHTML = "";
      usuarios.forEach(function (usuario) {
        const divUsuario = document.createElement("div");
        divUsuario.className = "div-usuario";

        const textoStatus = usuario.status ? "Ativo" : "Desativado";
        const textoNivel = usuario.nivel === 1 ? "Administrador" : "Estoquista";

        const pNome = document.createElement("span");
        pNome.textContent = `${usuario.nome}`;
        const pEmail = document.createElement("span");
        pEmail.textContent = `${usuario.email}`;
        const pStatus = document.createElement("span");
        pStatus.textContent = `${textoStatus}`;
        const pNivel = document.createElement("span");
        pNivel.textContent = `${textoNivel}`;

        divUsuario.appendChild(pNome);
        divUsuario.appendChild(pEmail);
        divUsuario.appendChild(pStatus);
        divUsuario.appendChild(pNivel);

        const divButtons = document.createElement("div");
        divButtons.className = "div-buttons";

        const divAlterar = document.createElement("div");
        divAlterar.className = "div-buttons";

        const btnAlterar = document.createElement("button");
        btnAlterar.textContent = "Alterar";
        btnAlterar.onclick = function () {
          window.location.href = "altUsuario.html";
        };
        divAlterar.appendChild(btnAlterar);

        const btnAtivar = document.createElement("button");
        btnAtivar.textContent = "Ativar";
        btnAtivar.disabled = usuario.status;
        btnAtivar.onclick = function () {
          console.log(`Ativar usuário ${usuario.nome}`);

          btnAtivar.disabled = true;
          btnDesativar.disabled = false;
        };
        divButtons.appendChild(btnAtivar);

        const btnDesativar = document.createElement("button");
        btnDesativar.textContent = "Desativar";
        btnDesativar.disabled = !usuario.status;
        btnDesativar.onclick = function () {
          console.log(`Desativar usuário ${usuario.nome}`);
          btnAtivar.disabled = false;
          btnDesativar.disabled = true;
        };
        divButtons.appendChild(btnDesativar);
        divUsuario.appendChild(divAlterar);
        divUsuario.appendChild(divButtons);
        listaUsuarios.appendChild(divUsuario);
      });
    })
    .catch(function (error) {
      console.error("Erro ao carregar os usuários:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  listarUsuarios();
});
