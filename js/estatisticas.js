import { listarLivros } from "./livros.js";

export async function exibirEstatisticas() {
  try {
    const livros = await listarLivros();

    const totalLivros = livros.length;

    const livrosDisponiveis = livros.filter(
      (livro) => livro.disponivel === true
    ).length;

    const livrosIndisponiveis = livros.filter(
      (livro) => livro.disponivel === false
    ).length;

    const totalPaginas = livros.reduce(
      (total, livro) => total + Number(livro.paginas),
      0
    );

    const mediaPaginas =
      totalLivros > 0 ? totalPaginas / totalLivros : 0;

    return {
      totalLivros,
      livrosDisponiveis,
      livrosIndisponiveis,
      totalPaginas,
      mediaPaginas
    };
  } catch {
    throw new Error("Erro ao exibir estatísticas");
  }
}