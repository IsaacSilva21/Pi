document.addEventListener("DOMContentLoaded", function() {
  const cepInput = document.getElementById("cep");
  const logradouroInput = document.querySelector(".logradouro");
  const numeroInput = document.getElementById("numero");
  const complementoInput = document.getElementById("complemento");
  const bairroInput = document.getElementById("bairro");
  const cidadeInput = document.getElementById("cidade");
  const ufInput = document.getElementById("uf");

  cepInput.addEventListener("change", function() {
    const cep = cepInput.value.replace("-", "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        logradouroInput.value = data.logradouro || "";
        complementoInput.value = data.complemento || "";
        bairroInput.value = data.bairro || "";
        cidadeInput.value = data.localidade || "";
        ufInput.value = data.uf || "";
      })
      .catch(error => console.error("Erro ao buscar CEP:", error));
  });
});
