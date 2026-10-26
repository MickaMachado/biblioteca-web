import { login } from "../js/auth.js";

const formulario = document.getElementById("formulario-login");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const mensagem = document.getElementById("mensagem-login");
const botaoEntrar = formulario.querySelector('button[type="submit"]');
const linkEsqueceuSenha = document.getElementById("esqueceu-senha");

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  mensagem.textContent = "";

  const email = campoEmail.value.trim();
  const senha = campoSenha.value;

  if (!email || !senha.trim()) {
    mensagem.textContent = "Preencha o e-mail e a senha.";
    return;
  }

  botaoEntrar.disabled = true;
  botaoEntrar.textContent = "Entrando...";

  try {
    const usuario = await login(email, senha);

    sessionStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    window.location.replace("../dashboard/dashboard.html");
  } catch (erro) {
    mensagem.textContent = erro.message;
  } finally {
    botaoEntrar.disabled = false;
    botaoEntrar.textContent = "Entrar";
  }
});

formulario.addEventListener("input", () => {
  mensagem.textContent = "";
});

linkEsqueceuSenha.addEventListener("click", (evento) => {
  evento.preventDefault();

  window.alert("Esta funcionalidade está em construção.");
});