document.getElementById('formCadastro').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const formData = new FormData(this); 
  

  fetch(`http://localhost:8080/usuarios/${usuarioId}`, {
      method: 'PUT', 
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao editar usuário');
      }
      return response.json();
    })
    .then(data => {
      alert('Usuário editado com sucesso');
      
    })
    .catch(error => {
      console.error('Erro:', error);
      alert('Erro ao editar usuário');
    });
});
