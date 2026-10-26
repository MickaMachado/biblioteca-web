import { Usuario } from "../js/Usuario.js";
import { cadastrarUsuario } from "../js/usuarios.js";

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
  const usuarioLogado = obterUsuarioLogado();

  if (!usuarioLogado) {
    sessionStorage.removeItem("usuarioLogado");
    window.location.replace("../login/login.html");
    return;
  }

  document.getElementById("nome-usuario").textContent =
    usuarioLogado.nome;

  document.getElementById("botao-sair").addEventListener(
    "click",
    () => {
      sessionStorage.removeItem("usuarioLogado");
      window.location.replace("../login/login.html");
    }
  );

  const formulario = document.getElementById("formulario-usuario");
  const mensagem = document.getElementById("mensagem-cadastro");
  const botaoSalvar = document.getElementById("botao-salvar");
  const campoCep = document.getElementById("cep");
  const mensagemCep = document.getElementById("mensagem-cep");

  let consultaAtual = null;

  function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = `mensagem-cadastro ${tipo}`;
  }

  function limparEndereco() {
    ["cidade", "estado", "logradouro", "bairro"].forEach((id) => {
      document.getElementById(id).value = "";
    });
  }

  campoCep.addEventListener("input", async () => {
    if (consultaAtual) {
      consultaAtual.abort();
      consultaAtual = null;
    }

    limparEndereco();

    const cep = campoCep.value.trim();

    if (!/^\d{8}$/.test(cep)) {
      mensagemCep.textContent =
        "Digite os oito números para consultar o endereço.";
      return;
    }

    const controlador = new AbortController();
    consultaAtual = controlador;

    mensagemCep.textContent = "Consultando CEP...";

    try {
      const resposta = await fetch(
        `https://viacep.com.br/ws/${cep}/json/`,
        { signal: controlador.signal }
      );

      if (!resposta.ok) {
        throw new Error("Falha na consulta");
      }

      const endereco = await resposta.json();

      if (controlador.signal.aborted) {
        return;
      }

      if (endereco.erro) {
        mensagemCep.textContent =
          "CEP não encontrado. Confira o número informado.";
        return;
      }

      document.getElementById("cidade").value =
        endereco.localidade || "";

      document.getElementById("estado").value =
        endereco.uf || "";

      document.getElementById("logradouro").value =
        endereco.logradouro || "";

      document.getElementById("bairro").value =
        endereco.bairro || "";

      mensagemCep.textContent =
        "Endereço consultado. Confira e complete os campos restantes.";
    } catch (erro) {
      if (erro.name !== "AbortError") {
        mensagemCep.textContent =
          "Não foi possível consultar o CEP. Preencha o endereço manualmente.";
      }
    } finally {
      if (consultaAtual === controlador) {
        consultaAtual = null;
      }
    }
  });

  formulario.addEventListener("input", () => {
    mensagem.textContent = "";
    mensagem.className = "mensagem-cadastro";
  });

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (consultaAtual) {
      exibirMensagem("Aguarde a consulta do CEP terminar.", "erro");
      return;
    }

    const dados = Object.fromEntries(
      new FormData(formulario).entries()
    );

    Object.keys(dados).forEach((chave) => {
      dados[chave] = dados[chave].trim();
    });

    const obrigatorios = [
      "nome",
      "genero",
      "dataNascimento",
      "cpf",
      "telefone",
      "email",
      "cep",
      "cidade",
      "estado",
      "logradouro",
      "numero",
      "bairro"
    ];

    if (obrigatorios.some((campo) => !dados[campo])) {
      exibirMensagem("Preencha todos os campos obrigatórios.", "erro");
      return;
    }

    if (dados.nome.length < 4 || dados.nome.length > 80) {
      exibirMensagem(
        "O nome completo deve ter entre 4 e 80 caracteres.",
        "erro"
      );
      return;
    }

    if (
      !/^\d{11}$/.test(dados.cpf) ||
      !/^\d{10,11}$/.test(dados.telefone) ||
      !/^\d{8}$/.test(dados.cep) ||
      !/^\d+$/.test(dados.numero)
    ) {
      exibirMensagem(
        "Confira os números do CPF, telefone, CEP e endereço.",
        "erro"
      );
      return;
    }

    if (typeof window.moment !== "function") {
      exibirMensagem(
        "A biblioteca de datas não carregou. Confira a conexão e atualize a página.",
        "erro"
      );
      return;
    }

    const data = window.moment(
      dados.dataNascimento,
      "DD/MM/YYYY",
      true
    );

    const limiteInicial = window.moment(
      "01/01/1900",
      "DD/MM/YYYY",
      true
    );

    const hoje = window.moment().startOf("day");

    if (
      !data.isValid() ||
      !data.isAfter(limiteInicial, "day") ||
      !data.isBefore(hoje, "day")
    ) {
      exibirMensagem(
        "Informe uma data válida, posterior a 01/01/1900 e anterior a hoje.",
        "erro"
      );
      return;
    }

    dados.dataNascimento = data.format("YYYY-MM-DD");

    botaoSalvar.disabled = true;
    botaoSalvar.textContent = "Salvando...";

    try {
      const usuario = new Usuario(dados);
      const resposta = await cadastrarUsuario(usuario);

      formulario.reset();

      mensagemCep.textContent =
        "Digite os oito números para consultar o endereço.";

      exibirMensagem(resposta, "sucesso");
      document.getElementById("nome").focus();
    } catch (erro) {
      exibirMensagem(erro.message, "erro");
    } finally {
      botaoSalvar.disabled = false;
      botaoSalvar.textContent = "Salvar";
    }
  });
}

iniciarPagina();