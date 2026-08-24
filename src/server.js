/**
 * server.js
 * Ponto de entrada da aplicação: configura o Express, os middlewares globais
 * e conecta as rotas.
 */

const express = require('express');
const tasksRoutes = require('./routes/tasksRoutes');
const { rotaNaoEncontrada, tratadorDeErros } = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(express.json());

// Libera CORS para que uma página HTML aberta localmente (ou outro front-end)
// consiga consumir esta API sem ser bloqueada pelo navegador.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Rota de health-check
app.get('/', (req, res) => {
  res.json({ status: 'ok', mensagem: 'Tasks API rodando com sucesso.' });
});

// Rotas da aplicação
app.use('/api/tasks', tasksRoutes);

// Tratamento de rota não encontrada e de erros
app.use(rotaNaoEncontrada);
app.use(tratadorDeErros);

app.listen(PORT, () => {
  console.log(`Tasks API rodando em http://localhost:${PORT}`);
});

module.exports = app;
