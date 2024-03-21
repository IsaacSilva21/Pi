function login() {
  
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  
  var usuario = {
      email: email,
      senha: senha
  };

  
  fetch('/usuarios/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario) 
  })
  .then(response => {
    if (response.ok) {
        
        window.location.href = '/Front/Casdatro.html';
    } else {
        
        alert('Acesso negado. Verifique suas credenciais.');
    }
  })
  .catch(error => {
     
      console.error('Erro durante a requisição:', error);
      alert('Ocorreu um erro durante o login. Tente novamente mais tarde.');
  });
}