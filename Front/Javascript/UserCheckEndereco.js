document.addEventListener("DOMContentLoaded", function () {
  const clienteId = localStorage.getItem("clienteId");
  const loggedIn = localStorage.getItem("loggedIn");
  if (!loggedIn) {
    window.location.href = "/Front/Html/UserLogin.html";
  } else {
  }
});
