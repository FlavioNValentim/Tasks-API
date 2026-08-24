/**
 * taskModel.js
 * Camada de dados (in-memory) responsável por armazenar e manipular as tarefas.
 * Em um projeto real, este arquivo seria substituído por uma camada de acesso
 * a um banco de dados (ex.: MongoDB, PostgreSQL), mantendo a mesma interface.
 */

let tasks = [];
let nextId = 1;

/**
 * Lista todas as tarefas, com filtro opcional por status de conclusão.
 * @param {Object} filtros
 * @param {boolean} [filtros.completed]
 */
function findAll({ completed } = {}) {
  if (completed === undefined) return tasks;
  return tasks.filter((task) => task.completed === completed);
}

/**
 * Busca uma tarefa pelo id.
 * @param {number} id
 */
function findById(id) {
  return tasks.find((task) => task.id === id);
}

/**
 * Cria uma nova tarefa.
 * @param {{ title: string, description?: string }} data
 */
function create({ title, description = '' }) {
  const now = new Date().toISOString();
  const task = {
    id: nextId++,
    title,
    description,
    completed: false,
    createdAt: now,
    updatedAt: now,
  };
  tasks.push(task);
  return task;
}

/**
 * Atualiza uma tarefa existente (atualização parcial).
 * @param {number} id
 * @param {Object} data
 */
function update(id, data) {
  const task = findById(id);
  if (!task) return null;

  const { title, description, completed } = data;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;
  task.updatedAt = new Date().toISOString();

  return task;
}

/**
 * Remove uma tarefa pelo id.
 * @param {number} id
 * @returns {boolean} true se removida, false se não encontrada
 */
function remove(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}

/**
 * Utilitário usado pelos testes para resetar o estado (não usado em produção).
 */
function _reset() {
  tasks = [];
  nextId = 1;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
  _reset,
};
