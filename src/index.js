const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const talkerManager = require('./talkerManager');
const validationLogin = require('./middlewares/validationLogin');
const validationTalker = require('./middlewares/validationTalker');

const { validationName, validationAge, validationWatchedAt,
  validationRate, validationToken, validationTalk } = validationTalker;

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

// Requisito 8 - crie o endpoint GET /talker/search?q=searchTerm
app.get('/talker/search', validationToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await talkerManager.getAllTalkers();
  const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));

  if (q) {
    return res.status(200).json(filteredTalkers);
  }

  if (!q) {
    return res.status(200).json(talkers);
  }

  if (!filteredTalkers) {
    return res.status(200).send([]);
  }
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

// Requisito 3 - crie o endpoint POST /login
app.post('/login', validationLogin, (req, res) => res.status(200)
.json({ token: crypto.randomBytes(8).toString('hex') }));

// Fonte: https://stackoverflow.com/questions/55104802/nodejs-crypto-randombytes-to-string-hex-doubling-size

// Requisito 5 - crie o endpoint POST /talker
app.post('/talker', validationToken, validationName, validationAge, validationTalk, 
validationWatchedAt, validationRate, async (req, res) => {
  const manager = req.body;
  const newTalker = await talkerManager.insertNewTalker(manager);
  return res.status(201).json(newTalker);
});

// Requisito 6 - crie o endpoint PUT /talker/:id
app.put('/talker/:id', validationToken, validationName, validationAge, validationTalk,
validationWatchedAt, validationRate, async (req, res) => {
  const manager = req.body;
  const { id } = req.params;
  const changeTalker = await talkerManager.changeTalkerManager(manager, id);
  return res.status(200).json(changeTalker);
});

// Requisito 7 - crie o endpoint DELETE /talker/:id
app.delete('/talker/:id', validationToken, async (req, res) => {
  const { id } = req.params;
  await talkerManager.deleteTalker(id);
  return res.status(204).end();
});
