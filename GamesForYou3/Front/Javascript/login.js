function login() {
  // Obtém os valores de email e senha do formulário
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  // Cria um objeto com os dados do usuário
  var usuario = {
      email: email,
      senha: senha
  };

  // Envia uma requisição POST para o endpoint /usuarios/login
  fetch('/usuarios/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario) // Converte o objeto para JSON
  })
  .then(response => {
    if (response.ok) {
        // Se o login for bem-sucedido (código 200), redireciona para a página de sucesso
        window.location.href = '/Front/Casdatro.html';
    } else {
        // Se o login falhar, exibe uma mensagem de erro
        alert('Acesso negado. Verifique suas credenciais.');
    }
  })
  .catch(error => {
      // Se ocorrer um erro durante a requisição, exibe uma mensagem de erro
      console.error('Erro durante a requisição:', error);
      alert('Ocorreu um erro durante o login. Tente novamente mais tarde.');
  });
}