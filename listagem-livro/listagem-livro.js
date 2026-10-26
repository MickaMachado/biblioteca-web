import { listarLivros } from "../js/livros.js";

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

function criarCelula(texto, classe = "") {
  const celula = document.createElement("td");

  celula.textContent = texto;

  if (classe) {
    celula.classList.add(classe);
  }

  return celula;
}

async function carregarListagem() {
  const corpoTabela = document.getElementById("corpo-tabela");
  const mensagem = document.getElementById("mensagem-listagem");

  corpoTabela.replaceChildren();
  mensagem.classList.remove("erro");

  try {
    const livros = await listarLivros();

    if (livros.length === 0) {
      mensagem.textContent = "Nenhum livro cadastrado.";
      return;
    }

    const linhas = document.createDocumentFragment();

    livros.forEach((livro) => {
      const linha = document.createElement("tr");

      linha.append(
        criarCelula(livro.titulo),
        criarCelula(livro.autor),
        criarCelula(livro.categoria),
        criarCelula(livro.paginas, "coluna-paginas")
      );

      linhas.appendChild(linha);
    });

    corpoTabela.appendChild(linhas);

    mensagem.textContent =
      livros.length === 1
        ? "1 livro cadastrado."
        : `${livros.length} livros cadastrados.`;
  } catch (erro) {
    mensagem.textContent = erro.message;
    mensagem.classList.add("erro");
  }
}

function iniciarPagina() {
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

  carregarListagem();
}

iniciarPagina();