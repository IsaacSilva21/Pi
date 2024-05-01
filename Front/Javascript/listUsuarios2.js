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
          window.location.href = `altUsuario.html?id=${usuario.id}`;
        };
        divAlterar.appendChild(btnAlterar);

        const btnAtivar = document.createElement("button");
        btnAtivar.textContent = "Ativar";
        btnAtivar.disabled = usuario.status;
        function ativarUsuario(usuarioId) {
          fetch(`http://localhost:8080/usuarios/${usuarioId}/ativar`, {
            method: "PUT",
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Erro ao ativar o usuário");
              }
            })
            .then((data) => {
              console.log("Usuário ativado:", data);
              listarUsuarios(); // Atualiza a lista de usuários
            })
            .catch((error) => {
              console.error("Erro:", error);
            });
        }
        btnAtivar.onclick = function () {
          ativarUsuario(usuario.id);
        };
        divButtons.appendChild(btnAtivar);

        const btnDesativar = document.createElement("button");
        btnDesativar.textContent = "Desativar";
        btnDesativar.disabled = !usuario.status;
        function desativarUsuario(usuarioId) {
          fetch(`http://localhost:8080/usuarios/${usuarioId}/desativar`, {
            method: "PUT",
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error("Erro ao desativar o usuário");
              }
            })
            .then((data) => {
              console.log("Usuário desativado:", data);
              listarUsuarios(); // Atualiza a lista de usuários
            })
            .catch((error) => {
              console.error("Erro:", error);
            });
        }
        btnDesativar.onclick = function () {
          desativarUsuario(usuario.id);
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
