import { Livro } from "../js/Livro.js";
import { cadastrarLivro } from "../js/livros.js";

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

  const formulario = document.getElementById("formulario-livro");
  const campoTitulo = document.getElementById("titulo");
  const campoAutor = document.getElementById("autor");
  const campoCategoria = document.getElementById("categoria");
  const campoPaginas = document.getElementById("paginas");
  const mensagem = document.getElementById("mensagem-cadastro");
  const botaoSalvar = document.getElementById("botao-salvar");

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    mensagem.textContent = "";
    mensagem.className = "mensagem-cadastro";

    const titulo = campoTitulo.value.trim();
    const autor = campoAutor.value.trim();
    const categoria = campoCategoria.value;
    const paginas = Number(campoPaginas.value);

    if (
      titulo.length < 4 ||
      titulo.length > 80 ||
      autor.length < 4 ||
      autor.length > 80
    ) {
      mensagem.textContent =
        "Título e autor devem ter entre 4 e 80 caracteres.";
      mensagem.classList.add("erro");
      return;
    }

    if (!categoria || !Number.isInteger(paginas) || paginas <= 0) {
      mensagem.textContent =
        "Selecione uma categoria e informe um número inteiro de páginas maior que zero.";
      mensagem.classList.add("erro");
      return;
    }

    botaoSalvar.disabled = true;
    botaoSalvar.textContent = "Salvando...";

    try {
      const livro = new Livro(titulo, autor, categoria, paginas);

      const resposta = await cadastrarLivro(livro);

      formulario.reset();

      mensagem.textContent = resposta;
      mensagem.classList.add("sucesso");
      campoTitulo.focus();
    } catch (erro) {
      mensagem.textContent = erro.message;
      mensagem.classList.add("erro");
    } finally {
      botaoSalvar.disabled = false;
      botaoSalvar.textContent = "Salvar";
    }
  });

  formulario.addEventListener("input", () => {
    mensagem.textContent = "";
    mensagem.className = "mensagem-cadastro";
  });
}

iniciarPagina();