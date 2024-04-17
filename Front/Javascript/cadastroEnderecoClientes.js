
  document.querySelector('.buttonadd').addEventListener('click', async function () {
    const cep = document.getElementById('cep').value;
    const endereco = await obterEnderecoPorCep(cep);

    if (endereco) {
      document.querySelector('.logradouro').value = endereco.logradouro;
      document.getElementById('numero').value = endereco.numero;
      document.getElementById('complemento').value = endereco.complemento;
      document.getElementById('bairro').value = endereco.bairro;
      document.getElementById('cidade').value = endereco.localidade;
      document.getElementById('uf').value = endereco.uf;
    } else {
      alert('CEP não encontrado. Por favor, verifique e tente novamente.');
    }
  });

  async function obterEnderecoPorCep(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erro ao obter endereço por CEP:', error);
      return null;
    }
  }

