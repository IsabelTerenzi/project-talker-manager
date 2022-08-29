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

module.exports = {
  getAllTalkers,
  insertNewTalker,
};