import { livrosCadastrados } from "../dados/livros-cadastrados.js";

const chaveArmazenamento = "bibliotecaWebLivros";

function carregarLivros() {
  const dadosSalvos = localStorage.getItem(chaveArmazenamento);

  if (dadosSalvos !== null) {
    const livros = JSON.parse(dadosSalvos);

    if (
      !Array.isArray(livros) ||
      !livros.every(
        (livro) =>
          livro &&
          Number.isInteger(livro.id) &&
          typeof livro.titulo === "string" &&
          typeof livro.autor === "string" &&
          typeof livro.categoria === "string" &&
          Number.isInteger(livro.paginas) &&
          livro.paginas > 0 &&
          typeof livro.disponivel === "boolean"
      )
    ) {
      throw new Error("Dados de livros inválidos");
    }

    livrosCadastrados.splice(
      0,
      livrosCadastrados.length,
      ...livros
    );
  }

  return livrosCadastrados;
}

export function cadastrarLivro(livro) {
  return new Promise((resolve, reject) => {
    try {
      const categorias = [
        "Programação",
        "Web Design",
        "Banco de Dados",
        "Ferramentas",
        "Design"
      ];

      const titulo = livro.titulo.trim();
      const autor = livro.autor.trim();

      if (
        titulo.length < 4 ||
        titulo.length > 80 ||
        autor.length < 4 ||
        autor.length > 80 ||
        !categorias.includes(livro.categoria) ||
        !Number.isInteger(livro.paginas) ||
        livro.paginas <= 0
      ) {
        throw new Error("Dados inválidos");
      }

      const livros = carregarLivros();

      const proximoId =
        livros.reduce(
          (maiorId, item) => Math.max(maiorId, item.id),
          0
        ) + 1;

      livro.id = proximoId;
      livro.titulo = titulo;
      livro.autor = autor;

      const listaAtualizada = [...livros, livro];

      localStorage.setItem(
        chaveArmazenamento,
        JSON.stringify(listaAtualizada)
      );

      livros.push(livro);

      resolve("Livro cadastrado com sucesso!");
    } catch {
      reject(new Error("Erro ao cadastrar o livro"));
    }
  });
}

export function listarLivros() {
  return new Promise((resolve, reject) => {
    try {
      const livros = carregarLivros();

      resolve(livros.map((livro) => ({ ...livro })));
    } catch {
      reject(new Error("Erro ao listar livros"));
    }
  });
}