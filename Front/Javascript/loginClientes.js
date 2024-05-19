function login() {
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  var usuario = {
    email: email,
    senha: senha,
  };

  fetch("http://localhost:8080/clientes/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parse the response body as JSON
      } else if (response.status === 400) {
        throw new Error("Acesso negado. Verifique suas credenciais.");
      } else {
        throw new Error("Erro durante a requisição.");
      }
    })
    .then((data) => {
      // Assuming the server returns the clientId in the response
      const clienteId = data.clienteId;
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("clienteId", clienteId);
      window.location.href = "/Front/Html/UserMenu.html";
    })
    .catch((error) => {
      console.error("Erro durante a requisição:", error.message);
      alert(error.message);
    });
}
