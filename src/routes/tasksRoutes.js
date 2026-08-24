/**
 * tasksRoutes.js
 * Define os endpoints relacionados a tarefas e os associa ao controller correspondente.
 */

const { Router } = require('express');
const tasksController = require('../controllers/tasksController');

const router = Router();

router.get('/', tasksController.listar);
router.get('/:id', tasksController.buscarPorId);
router.post('/', tasksController.criar);
router.put('/:id', tasksController.atualizar);
router.delete('/:id', tasksController.excluir);

module.exports = router;
