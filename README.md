# Tasks-API

Sistema Simples de Cadastro de Tarefas.

API REST desenvolvida em Node.js utilizando Express para cadastro de tarefas.

## Funcionalidades

* Inserir tarefas
* Listar tarefas cadastradas (com filtro por concluídas/pendentes)
* Alterar tarefas
* Excluir tarefas

## Tecnologias Utilizadas

* Node.js
* JavaScript
* Express

## Estrutura do Projeto

* `server.js`
  * Ponto de entrada da aplicação, responsável por subir o servidor Express.
* `tasksRoutes.js`
  * Responsável por definir os endpoints da API.
* `tasksController.js`
  * Responsável pelas ações da API e validação dos dados recebidos.
* `taskModel.js`
  * Classe responsável pela criação e manipulação dos dados das tarefas.

## Dados

Cada tarefa é armazenada com a seguinte estrutura:

```
{
  id: number,
  title: string,
  description: string,
  completed: boolean,
  createdAt: string,
  updatedAt: string
}
```

## Como executar

```bash
npm install
npm start
```

A API sobe em `http://localhost:3000`.
