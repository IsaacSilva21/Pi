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
      listaUsuarios.innerHTML = ""; // Limpar a lista antes de adicionar os novos usuários
      usuarios.forEach(function (usuario) {
        // Criar elemento de lista para o usuário
        const itemUsuario = document.createElement("p");

        // Adicionar nome, email e status ao item da lista
        const textoStatus = usuario.status ? "Ativo" : "Desativado";
        itemUsuario.textContent = `${usuario.nome} ${usuario.email} ${textoStatus}`;

        // Criar e adicionar os botões ao item da lista
        const btnAlterar = document.createElement("button");
        btnAlterar.textContent = "Alterar";
        btnAlterar.onclick = function () {
          console.log(`Alterar usuário ${usuario.nome}`);
        };
        itemUsuario.appendChild(btnAlterar);

        const btnAtivar = document.createElement("button");
        btnAtivar.textContent = "Ativar";
        btnAtivar.disabled = usuario.status; // Desativar se o usuário já estiver ativo
        btnAtivar.onclick = function () {
          console.log(`Ativar usuário ${usuario.nome}`);
          btnAtivar.disabled = true;
          btnDesativar.disabled = false;
          // Aqui você pode adicionar a lógica para ativar o usuário via requisição fetch
        };
        itemUsuario.appendChild(btnAtivar);

        const btnDesativar = document.createElement("button");
        btnDesativar.textContent = "Desativar";
        btnDesativar.disabled = !usuario.status; // Desativar se o usuário já estiver desativado
        btnDesativar.onclick = function () {
          console.log(`Desativar usuário ${usuario.nome}`);
          btnAtivar.disabled = false;
          btnDesativar.disabled = true;
          // Aqui você pode adicionar a lógica para desativar o usuário via requisição fetch
        };
        itemUsuario.appendChild(btnDesativar);

        // Adicionar o item da lista à lista de usuários
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
