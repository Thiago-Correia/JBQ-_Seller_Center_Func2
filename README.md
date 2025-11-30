# Projeto — Backend (Node) + Frontend (Angular)

Este projeto é composto por duas partes principais:

- **Backend:** Node.js + Express  
- **Frontend:** Angular

---

##  Pré-requisitos

Para rodar o projeto, você precisa ter instalado:

- **Node.js** (versão LTS recomendada)  
- **Angular CLI**
- **MySQL(De preferencia MySQLWorkbench)
  ```bash
  npm install -g @angular/cli
  ```
- Um editor de código, como VSCode
  
# Configuração do Banco de Dados

Use o arquivo.sql para criar o banco de dados


#Como rodar no Backend (Node.js)


Antes de rodar o backend, é obrigatório editar o arquivo:

  ```bash
  backend/db.js
  ```
Configure os dados de conexão com o banco:

  ```bash
  module.exports = {
    host: "localhost",
    user: "root",
    password: "sua_senha",
    database: "nome_do_banco"
  };
  ```

No terminal, dentro da pasta backend, execute:
 ```bash
node server.js
 ```
O servidor iniciará na porta configurada (padrão: 3000).

#Como rodar o Frontend (Angular)

No terminal, dentro da pasta frontend, execute:
 ```bash
ng serve
```
A aplicação estará disponível em:
 ```bash
http://localhost:4200
```
