# Biblioteca Web

## Descrição

Biblioteca Web é uma aplicação para organizar o acervo de uma biblioteca, cadastrar usuários e livros e consultar estatísticas.

O projeto busca facilitar a consulta das informações e reduzir o trabalho manual de organização do acervo.

Foi desenvolvido como atividade acadêmica com HTML, CSS e JavaScript puro, sem backend ou banco de dados.

## Funcionalidades

- Login com e-mail e senha.
- Validação das credenciais e mensagens de erro.
- Armazenamento da sessão do usuário com sessionStorage.
- Cabeçalho com identificação do usuário.
- Menu de navegação e encerramento da sessão.
- Dashboard com cinco estatísticas do acervo.
- Cadastro de livros com validação dos campos.
- Listagem dos livros em tabela.
- Cadastro de usuários com validação dos campos.
- Validação da data de nascimento com Moment.js.
- Consulta de endereço pelo CEP com ViaCEP.
- Persistência dos cadastros no navegador com localStorage.
- Layout adaptável para celulares e computadores.

Os botões de empréstimo e devolução permanecem desabilitados,
conforme os requisitos do trabalho.

A recuperação de senha apresenta um aviso de funcionalidade
em construção.

## Tecnologias e técnicas utilizadas

- HTML5 e elementos semânticos.
- CSS3, Grid, Flexbox e media queries.
- JavaScript puro.
- Manipulação do DOM e eventos.
- Classes e construtores: Usuario e Livro.
- Módulos com import e export.
- Promises e async/await.
- Métodos de arrays: find, filter, reduce e forEach.
- Fetch API para consulta ao ViaCEP.
- Moment.js, carregado por CDN.
- sessionStorage e localStorage.
- Git e GitHub para versionamento.

## Estrutura do projeto

```text
biblioteca-web/
├── cadastro-livro/
│   ├── cadastro-livro.html
│   ├── cadastro-livro.css
│   └── cadastro-livro.js
├── cadastro-usuario/
│   ├── cadastro-usuario.html
│   ├── cadastro-usuario.css
│   └── cadastro-usuario.js
├── css/
│   └── style.css
├── dashboard/
│   ├── dashboard.html
│   ├── dashboard.css
│   └── dashboard.js
├── dados/
│   ├── livros-cadastrados.js
│   ├── usuarios-cadastrados.js
│   └── usuarios-sistema.js
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── estatisticas.js
│   ├── Livro.js
│   ├── livros.js
│   ├── Usuario.js
│   └── usuarios.js
├── listagem-livro/
│   ├── listagem-livro.html
│   ├── listagem-livro.css
│   └── listagem-livro.js
├── login/
│   ├── login.html
│   ├── login.css
│   └── login.js
├── index.html
├── package.json
└── readme.md
```

## Como executar

1. Baixe ou clone este repositório:

   ```bash
   git clone https://github.com/MickaMachado/biblioteca-web.git
   ```

2. Abra a pasta biblioteca-web no Visual Studio Code.
3. Instale a extensão Live Server, de Ritwick Dey.
4. Clique com o botão direito em index.html.
5. Selecione Open with Live Server.
6. Utilize uma das contas de demonstração para entrar.

Não é necessário executar npm install.

Como o projeto utiliza módulos JavaScript, as páginas devem ser
acessadas por um servidor HTTP local, como o Live Server.

É necessária conexão com a internet para carregar o Moment.js
e consultar o ViaCEP.

## Contas de demonstração

As contas abaixo são fictícias e foram fornecidas no enunciado:

| E-mail | Senha |
| --- | --- |
| ana.silva@lib.com | 123456 |
| carlos.santos@lib.com | 456789 |
| mariana.costa@lib.com | 789123 |

Os usuários cadastrados pelo formulário são usuários da biblioteca.
Eles não recebem acesso ao login do sistema.

## Armazenamento dos dados

Os dados iniciais ficam em arquivos JavaScript na pasta dados.

Os novos cadastros são armazenados no localStorage do navegador.
Eles permanecem disponíveis após atualizar a página, mas não são
compartilhados entre navegadores ou computadores.

Limpar os dados do site remove os cadastros salvos localmente.

A sessão de acesso é mantida no sessionStorage e removida pelo
botão Sair.

A autenticação é uma simulação acadêmica com credenciais no código.

## Melhorias futuras

- Implementar empréstimos e devoluções.
- Adicionar busca e filtros na listagem.
- Permitir edição e exclusão de registros.
- Implementar recuperação de senha.
- Integrar backend e banco de dados.
- Implementar autenticação segura.

## Autoria

Micka Machado Cintra.