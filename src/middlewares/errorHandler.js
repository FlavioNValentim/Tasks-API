/**
 * errorHandler.js
 * Middlewares para lidar com rotas inexistentes e erros não tratados.
 */

function rotaNaoEncontrada(req, res, next) {
  res.status(404).json({ erro: `Rota não encontrada: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
function tratadorDeErros(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
}

module.exports = { rotaNaoEncontrada, tratadorDeErros };
