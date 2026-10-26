import { usuariosCadastrados } from "../dados/usuarios-cadastrados.js";

const chaveArmazenamento = "bibliotecaWebUsuarios";

export function cadastrarUsuario(usuario) {
  return new Promise((resolve, reject) => {
    try {
      const dadosSalvos = localStorage.getItem(chaveArmazenamento);

      if (dadosSalvos !== null) {
        const usuarios = JSON.parse(dadosSalvos);

        if (
          !Array.isArray(usuarios) ||
          !usuarios.every(
            (item) => item && Number.isInteger(item.id)
          )
        ) {
          throw new Error("Dados de usuários inválidos");
        }

        usuariosCadastrados.splice(
          0,
          usuariosCadastrados.length,
          ...usuarios
        );
      }

      usuario.id =
        usuariosCadastrados.reduce(
          (maiorId, item) => Math.max(maiorId, item.id),
          0
        ) + 1;

      const listaAtualizada = [...usuariosCadastrados, usuario];

      localStorage.setItem(
        chaveArmazenamento,
        JSON.stringify(listaAtualizada)
      );

      usuariosCadastrados.push(usuario);

      resolve("Usuário cadastrado com sucesso!");
    } catch {
      reject(new Error("Erro ao cadastrar o usuário"));
    }
  });
}