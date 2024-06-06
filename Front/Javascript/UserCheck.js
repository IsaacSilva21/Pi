document.addEventListener("DOMContentLoaded", function () {
  const clienteId = localStorage.getItem("clienteId");
  const precoCarrinho = localStorage.getItem("precoCarrinho");
  const cepEndereco = localStorage.getItem("cepEndereco");
  const logradouro = localStorage.getItem("logradouro");
  const numero = localStorage.getItem("numero");
  const bairro = localStorage.getItem("bairro");
  const cidade = localStorage.getItem("cidade");
  const uf = localStorage.getItem("uf");
  const nomeProduto = localStorage.getItem("nomeProduto");
  const quantidadePro = localStorage.getItem("quantidadePro");

  const precoElement = document.getElementById("preco");
  precoElement.textContent = `R$${precoCarrinho}`;

  alert(`clienteId: ${clienteId}`);
  alert(`precoCarrinho: ${precoCarrinho}`);
  alert(`cepEndereco: ${cepEndereco}`);
  alert(`logradouro: ${logradouro}`);
  alert(`numero: ${numero}`);
  alert(`bairro: ${bairro}`);
  alert(`cidade: ${cidade}`);
  alert(`uf: ${uf}`);
  alert(`nomeProduto: ${nomeProduto}`);
  alert(`quantidadePro: ${quantidadePro}`);

  const infoElement = document.querySelector(".info");

  document.getElementById("inputBoleto").style.display = "none";
  document.getElementById("inputNum").style.display = "none";
  document.getElementById("inputCod").style.display = "none";
  document.getElementById("inputNom").style.display = "none";
  document.getElementById("inputData").style.display = "none";
  document.getElementById("inputQuan").style.display = "none";

  document.getElementById("forma").addEventListener("change", function (event) {
    var selectedOption = event.target.value;

    document.getElementById("inputBoleto").style.display = "none";
    document.getElementById("inputNum").style.display = "none";
    document.getElementById("inputCod").style.display = "none";
    document.getElementById("inputNom").style.display = "none";
    document.getElementById("inputData").style.display = "none";
    document.getElementById("inputQuan").style.display = "none";

    if (selectedOption === "1") {
      document.getElementById("inputBoleto").style.display = "block";
      infoElement.style.height = "400px";
    } else if (selectedOption === "2") {
      infoElement.style.height = "700px";
      document.getElementById("inputNum").style.display = "block";
      document.getElementById("inputCod").style.display = "block";
      document.getElementById("inputNom").style.display = "block";
      document.getElementById("inputData").style.display = "block";
      document.getElementById("inputQuan").style.display = "block";
    }
  });

  const formulario = document.getElementById("formulario");
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const Ipag = document.querySelector(".forma").value;

    const userData = {
      valor: precoCarrinho,
      nomeproduto: nomeProduto,
      quantidade: quantidadePro,
      cep: cepEndereco,
      logradouro: logradouro,
      numero: numero,
      bairro: bairro,
      cidade: cidade,
      uf: uf,
      status: "aguardando confirmação do pagamento",
      idcliente: clienteId,
      metodopag: Ipag,
    };

    fetch("http://localhost:8080/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(function (res) {
        if (res.ok) {
          console.log("Pedido criado com sucesso");
          limpar();
        } else {
          console.error("Erro ao criar o pedido:", res.statusText);
        }
      })
      .catch(function (error) {
        console.error("Erro ao enviar os dados:", error);
      });
  });

  function limpar() {
    formulario.reset();
  }
});
