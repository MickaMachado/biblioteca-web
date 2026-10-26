import { exibirEstatisticas } from "../js/estatisticas.js";

function obterUsuarioLogado() {
  try {
    const usuario = JSON.parse(
      sessionStorage.getItem("usuarioLogado")
    );

    if (
      !usuario ||
      typeof usuario.nome !== "string" ||
      !usuario.nome.trim()
    ) {
      return null;
    }

    return usuario;
  } catch {
    return null;
  }
}

async function carregarEstatisticas() {
  const mensagem = document.getElementById("mensagem-dashboard");

  try {
    const estatisticas = await exibirEstatisticas();

    const formatoInteiro = new Intl.NumberFormat("pt-BR");

    const formatoMedia = new Intl.NumberFormat("pt-BR", {
      maximumFractionDigits: 1
    });

    document.getElementById("total-livros").textContent =
      formatoInteiro.format(estatisticas.totalLivros);

    document.getElementById("livros-disponiveis").textContent =
      formatoInteiro.format(estatisticas.livrosDisponiveis);

    document.getElementById("livros-indisponiveis").textContent =
      formatoInteiro.format(estatisticas.livrosIndisponiveis);

    document.getElementById("total-paginas").textContent =
      formatoInteiro.format(estatisticas.totalPaginas);

    document.getElementById("media-paginas").textContent =
      formatoMedia.format(estatisticas.mediaPaginas);
  } catch (erro) {
    mensagem.textContent = erro.message;
  }
}

function iniciarDashboard() {
  const usuario = obterUsuarioLogado();

  if (!usuario) {
    sessionStorage.removeItem("usuarioLogado");
    window.location.replace("../login/login.html");
    return;
  }

  document.getElementById("nome-usuario").textContent =
    usuario.nome;

  document.getElementById("botao-sair").addEventListener(
    "click",
    () => {
      sessionStorage.removeItem("usuarioLogado");
      window.location.replace("../login/login.html");
    }
  );

  carregarEstatisticas();
}

iniciarDashboard();