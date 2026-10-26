# Biblioteca Web

## Descrição do projeto

Biblioteca Web é uma aplicação desenvolvida para facilitar a organização do acervo de uma biblioteca e a consulta às informações dos livros.

O projeto busca reduzir o trabalho manual e reunir, em uma interface acessível, o cadastro de usuários e livros, a listagem do acervo e suas estatísticas.

Até o momento, foram implementados o login e o dashboard com as estatísticas dos livros. Os cadastros e a listagem estão em desenvolvimento.

## Tecnologias e técnicas utilizadas

- HTML5 para a estrutura das páginas.
- CSS3 para a apresentação visual.
- JavaScript puro para as funcionalidades.
- CSS Grid, Flexbox e media queries para adaptar o layout.
- Módulos JavaScript com import e export.
- Promises e async/await para autenticação e consulta das estatísticas.
- Manipulação do DOM para apresentar informações e mensagens.
- sessionStorage para armazenar os dados do usuário durante a sessão.
- Métodos de arrays, como find, filter e reduce.
- Dados iniciais organizados em arrays de objetos.

A aplicação funciona no navegador, sem backend ou banco de dados. A autenticação é uma simulação acadêmica com usuários definidos no código.

## Funcionalidades implementadas

- Login com e-mail e senha.
- Mensagem de erro para credenciais inválidas.
- Aviso de recuperação de senha em construção.
- Redirecionamento para o dashboard após o login.
- Identificação do usuário no cabeçalho.
- Encerramento da sessão pelo botão Sair.
- Verificação da sessão ao acessar o dashboard.
- Exibição de cinco estatísticas:
  - Total de livros cadastrados.
  - Quantidade de livros disponíveis.
  - Quantidade de livros indisponíveis.
  - Total de páginas do acervo.
  - Média de páginas por livro.

Os botões de empréstimo e devolução permanecem desabilitados, conforme o escopo solicitado.

## Estrutura do projeto

```text
biblioteca-web/
├── css/
│   └── style.css
├── dashboard/
│   ├── dashboard.html
│   ├── dashboard.css
│   └── dashboard.js
├── dados/
│   ├── usuarios-sistema.js
│   ├── usuarios-cadastrados.js
│   └── livros-cadastrados.js
├── js/
│   ├── app.js
│   ├── auth.js
│   └── estatisticas.js
├── login/
│   ├── login.html
│   ├── login.css
│   └── login.js
├── index.html
├── package.json
└── readme.md
```

## Como executar

1. Baixe ou clone o repositório.
2. Abra a pasta biblioteca-web no Visual Studio Code.
3. Instale a extensão Live Server, de Ritwick Dey.
4. Clique com o botão direito no arquivo index.html.
5. Selecione Open with Live Server.
6. O sistema será aberto no navegador e direcionado para o login.

O projeto utiliza módulos JavaScript e deve ser acessado por um servidor HTTP local, como o fornecido pelo Live Server.

Não é necessário executar npm install.

### Acesso para demonstração

Utilize uma das contas fictícias fornecidas pelo enunciado:

| E-mail | Senha |
| --- | --- |
| ana.silva@lib.com | 123456 |
| carlos.santos@lib.com | 456789 |
| mariana.costa@lib.com | 789123 |

## Próximas etapas

- Implementar o cadastro de usuários e suas validações.
- Integrar a consulta de endereço pelo CEP.
- Implementar o cadastro de livros.
- Implementar a listagem do acervo.
- Criar as classes Usuario e Livro.
- Concluir os testes em dispositivos móveis e computadores.

## Melhorias futuras

- Implementar empréstimos e devoluções.
- Adicionar busca e filtros de livros.
- Permitir edição e exclusão de registros.
- Integrar um backend e um banco de dados para persistência dos cadastros e autenticação segura.