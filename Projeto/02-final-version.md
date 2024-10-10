# **CSI606-2024 - Presencial - Trabalho Final - Resultados**

## *Aluna(o): Daniele Almeida*

--------------

<!-- Este documento tem como objetivo apresentar o projeto desenvolvido, considerando o que foi definido na proposta e o produto final. -->

### Resumo

### 1. Funcionalidades implementadas
Funcionalidades da aplicação:
  Usuários:
  - Cadastro de usuários;
  - Login de usuários;
  - Autenticação dos usuários;
  Posts:
  - Cadastro de posts;
  - Edição de posts;
  - Exclusão de posts;
  - Visualizar posts cadastrados pelo usuário.
  
### 2. Funcionalidades previstas e não implementadas
As funcionalidades propostas foram impplementadas. Porém, para melhorar o uso da aplicação, é interessante incluir no futuro as seguintes funcionalidades:
  - Exclusão de usuários;
  - Edição de usuários;
  - Perfil de usuários;
  - Incluir, editar e excluir comentários nos posts.

### 3. Outras funcionalidades implementadas
- Somente os autores dos posts podem editar as suas próprias publicações.
- Quando fizer o logout, o usuário será redirecionado para a Home Page.

### 4. Principais desafios e dificuldades
- A parte do backend foi a mais difícil, principalmente para realizar o cadastro e a autenticação de usuários. Foram várias tentativas e erros até que os processos ocorressem de forma satisfatória. Pesquisando os erros na internet (com a ajuda do stackoverflow), foi possível encontrar algumas das soluções. Porém, continuei tendo alguns problemas devido à versão 

### 5. Instruções para instalação e execução

Configurar banco de dados:
Usei o MongoDB online: [https://www.mongodb.com/pt-br](https://www.mongodb.com/pt-br)
Passos:
- Realizar o login
- Criar um novo projeto
- Construir um novo banco de dados
- Criar usuário do banco de dados: colocar nome de usuário e senha (salvar a senha, pois será utilizada no passo a seguir)
- Conectar o banco de dados (Connect with the MongoDB Shell)
- Copiar a connection string (será adicionada na página index.js da API). Onde estiver escrito 'db_password', você deve substituir pela senha salva anteriormente.
- Em \Projeto\api\index.js , vamos realizar a conexão com o banco de dados utilizando o mongoose, substituindo a string pela string alterada. Como no exemplo: mongoose.connect('string alterada').

Instalar bibliotecas:
React Quill (utilizada para trazer funcionalidades para a criação e edição de posts):
#### `yarn add react-quill`
Date-fns (utilizada para formatar data e hora da criação dos posts):
#### `yarn add date-fns`
Multer (utilizado para fazer o upload das imagens):
#### `yarn add multer`

#### Execução:
Digitar o seguinte comando no diretório client do projeto:
#### `yarn start`
Para visualizar, abrir no navegador: [http://localhost:3000](http://localhost:3000)

Digitar o seguinte comando no diretório api do projeto:
#### `npx nodemon`

### 6. Referências

  #### Ferramentas utilizadas:
  - REACT.JS. React.js: The library for web and native user interfaces. Página inicial. Disponível em: https://react.dev/
  - NODE.JS. Node.js: Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Página inicial. Disponível em: https://nodejs.org/pt
  - EXPRESS.JS. Express.js: Framework web rápido, flexível e minimalista para Node.js. Página inicial. Disponível em: https://expressjs.com/pt-br/
  - MONGODB. MogoDB:Get your ideas to market faster with a developer data platform built on the leading modern database. Página inicial. Disponível em: https://www.mongodb.com/pt-br
  - JWT. JWT: JSON Web Token (JWT) is a compact URL-safe means of representing claims to be transferred between two parties. Página inicial. Disponível em: https://jwt.io/

  #### Bibliotecas utilizadas no projeto:
  - REACT QUILL. React Quill: The Quill rich-text editor as a React component. Disponível em: https://classic.yarnpkg.com/en/package/react-quill
  - DATE-FNS. Date-fns: Modern JavaScript date utility library. Disponível em: https://classic.yarnpkg.com/en/package/date-fns
  - MULTER. Multer: Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. Disponível em: https://classic.yarnpkg.com/en/package/multer

  #### Ícones utilizados no projeto:
  - HEROICONS. Heroicons: Beautiful hand-crafted SVG icons, by the makers of Tailwind CSS. Página inicial. Disponível em:https://heroicons.com/

