const express = require('express');
const bodyParser = require('body-parser');
const talkerManager = require('./talkerManager');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar.
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// Requisito 1 - crie o endpoint GET /talker
app.get('/talker', async (req, res) => {
  const talkers = await talkerManager.getAllTalkers();

  if (talkers) {
    return res.status(200).json(talkers);
  } 
    return res.status(200).send([]);
});

// Requisito 2 - crie o endpoint GET /talker:id
app.get('/talker/:id', async (req, res) => {
  const talkers = await talkerManager.getAllTalkers();
  const id = Number(req.params.id);
  const talker = talkers.find((tal) => tal.id === id);

  if (talker) {
    return res.status(200).json(talker);
  } 
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});
