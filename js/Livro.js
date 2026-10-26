export class Livro {
  constructor(titulo, autor, categoria, paginas) {
    this.id = null;
    this.titulo = titulo;
    this.autor = autor;
    this.categoria = categoria;
    this.paginas = Number(paginas);
    this.disponivel = true;
  }
}