const fs = require('fs').promises;
const { join } = require('path');

const path = '/talker.json';

const readTalkerFile = async () => {
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const getAllTalkers = async () => {
  const talkers = await readTalkerFile();
  return talkers;
};

const insertNewTalker = async (talker) => {
  const talkers = await getAllTalkers();
  const newTalker = { ...talker, id: talkers.length + 1 };
  talkers.push(newTalker);
  await fs.writeFile(join(__dirname, path), JSON.stringify(talkers));
  return newTalker;
};

const changeTalkerManager = async (talker, id) => {
  const talkers = await getAllTalkers();
  let changedTalker;

  for (let i = 0; i < talkers.length; i += 1) {
    if (talkers[i].id === Number(id)) {
      talkers[i].name = talker.name;
      talkers[i].age = talker.age;
      talkers[i].talk = talker.talk;
      changedTalker = talkers[i];
    }
  }
  await fs.writeFile(join(__dirname, path), JSON.stringify(talkers));
  return changedTalker;
};

module.exports = {
  getAllTalkers,
  insertNewTalker,
  changeTalkerManager,
};