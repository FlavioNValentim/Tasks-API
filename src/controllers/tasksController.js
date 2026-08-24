/**
 * tasksController.js
 * Contém a lógica de negócio de cada rota de tarefas.
 * Responsável por validar entradas, chamar o model e formatar as respostas HTTP.
 */

const taskModel = require('../models/taskModel');

/**
 * GET /api/tasks
 * Lista todas as tarefas. Aceita query param opcional ?completed=true|false
 */
function listar(req, res) {
  const { completed } = req.query;

  let filtro = {};
  if (completed !== undefined) {
    if (completed !== 'true' && completed !== 'false') {
      return res.status(400).json({
        erro: "O parâmetro 'completed' deve ser 'true' ou 'false'.",
      });
    }
    filtro.completed = completed === 'true';
  }

  const tasks = taskModel.findAll(filtro);
  return res.status(200).json({ total: tasks.length, tasks });
}

/**
 * GET /api/tasks/:id
 * Busca uma tarefa específica pelo id.
 */
function buscarPorId(req, res) {
  const id = Number(req.params.id);
  const task = taskModel.findById(id);

  if (!task) {
    return res.status(404).json({ erro: 'Tarefa não encontrada.' });
  }

  return res.status(200).json(task);
}

/**
 * POST /api/tasks
 * Cria uma nova tarefa.
 * Body esperado: { title: string, description?: string }
 */
function criar(req, res) {
  const { title, description } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      erro: "O campo 'title' é obrigatório e deve ser uma string não vazia.",
    });
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ erro: "O campo 'description' deve ser uma string." });
  }

  const novaTask = taskModel.create({ title: title.trim(), description });
  return res.status(201).json(novaTask);
}

/**
 * PUT /api/tasks/:id
 * Atualiza uma tarefa existente (título, descrição e/ou status de conclusão).
 * Body esperado: { title?: string, description?: string, completed?: boolean }
 */
function atualizar(req, res) {
  const id = Number(req.params.id);
  const { title, description, completed } = req.body;

  if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
    return res.status(400).json({ erro: "O campo 'title' deve ser uma string não vazia." });
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ erro: "O campo 'description' deve ser uma string." });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({ erro: "O campo 'completed' deve ser um booleano (true/false)." });
  }

  const taskAtualizada = taskModel.update(id, { title, description, completed });

  if (!taskAtualizada) {
    return res.status(404).json({ erro: 'Tarefa não encontrada.' });
  }

  return res.status(200).json(taskAtualizada);
}

/**
 * DELETE /api/tasks/:id
 * Remove uma tarefa pelo id.
 */
function excluir(req, res) {
  const id = Number(req.params.id);
  const removida = taskModel.remove(id);

  if (!removida) {
    return res.status(404).json({ erro: 'Tarefa não encontrada.' });
  }

  return res.status(204).send();
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  excluir,
};
