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
        const itemUsuario = document.createElement("p");

        const textoStatus = usuario.status ? "Ativo" : "Desativado";
        itemUsuario.textContent = `${usuario.nome} ${usuario.email} ${textoStatus}`;

        const btnAlterar = document.createElement("button");
        btnAlterar.textContent = "Alterar";
        btnAlterar.onclick = function () {
          console.log(`Alterar usuário ${usuario.nome}`);
        };
        itemUsuario.appendChild(btnAlterar);

        const btnAtivar = document.createElement("button");
        btnAtivar.textContent = "Ativar";
        btnAtivar.disabled = usuario.status;
        btnAtivar.onclick = function () {
          console.log(`Ativar usuário ${usuario.nome}`);
          btnAtivar.disabled = true;
          btnDesativar.disabled = false;
        };
        itemUsuario.appendChild(btnAtivar);

        const btnDesativar = document.createElement("button");
        btnDesativar.textContent = "Desativar";
        btnDesativar.disabled = !usuario.status;
        btnDesativar.onclick = function () {
          console.log(`Desativar usuário ${usuario.nome}`);
          btnAtivar.disabled = false;
          btnDesativar.disabled = true;
        };
        itemUsuario.appendChild(btnDesativar);

        listaUsuarios.appendChild(itemUsuario);
      });
    })
    .catch(function (error) {
      console.error("Erro ao carregar os usuários:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  listarUsuarios();
});
