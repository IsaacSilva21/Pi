document.addEventListener("DOMContentLoaded", function () {
  const clienteId = localStorage.getItem("clienteId");
  const loggedIn = localStorage.getItem("loggedIn");
  if (!loggedIn) {
    window.location.href = "/Front/Html/UserLogin.html";
  } else {
    console.log("Cliente ID no localStorage:", clienteId);

    // Verifica se clienteId está definido antes de fazer a requisição
    if (clienteId) {
      fetch(`http://localhost:8080/clientes/${clienteId}`)
        .then((response) => response.json())
        .then((cliente) => {
          document.querySelector(".nome").innerText = cliente.nome;
          document.querySelector(".email").innerText = cliente.email;
          document.querySelector(".genero").innerText = cliente.genero;
          document.querySelector(".data").innerText = cliente.data;
          document.title = `${cliente.nome} 🎮 GFY`;
        })
        .catch((error) => {
          console.error("Erro ao obter informações do cliente:", error);
        });
    }
  }
});
