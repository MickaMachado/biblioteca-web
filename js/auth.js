import { usuariosSistema } from "../dados/usuarios-sistema.js";

export function login(usuario, senha) {
  return new Promise((resolve, reject) => {
    const emailNormalizado = usuario.trim().toLowerCase();

    const usuarioEncontrado = usuariosSistema.find((item) => {
      return (
        item.email.toLowerCase() === emailNormalizado &&
        item.senha === senha
      );
    });

    if (usuarioEncontrado) {
      const dadosUsuario = {
        id: usuarioEncontrado.id,
        nome: usuarioEncontrado.nome,
        email: usuarioEncontrado.email
      };

      resolve(dadosUsuario);
    } else {
      reject(
        new Error("Dados incorretos. Favor verificar e tentar novamente")
      );
    }
  });
}