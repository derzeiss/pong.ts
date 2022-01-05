import { Game, ais, ScoreArray } from '@derzeiss/pong';
import { Results } from '../types';
import fs from 'fs';
import path from 'path';

const getSwappedScore: (results: ScoreArray) => ScoreArray = (results) => [
  results[0],
  results[2],
  results[1],
];

function runSimulations() {
  let results: Results = {};

  for (let i = 0; i < ais.length; i++) {
    if (i == ais.length - 1) break;
    const p1Class = ais[i];
    console.log('p1', i, p1Class.NAME, p1Class.name, typeof p1Class);

    for (let j = i + 1; j < ais.length; j++) {
      const p2Class = ais[j];
      console.log('p2', i, j, p2Class.NAME, p2Class.name, typeof p2Class);

      const g = new Game(p1Class, p2Class);
      const scores = g.simulate(1000);

      if (!results[p1Class.NAME]) results[p1Class.NAME] = {};
      if (!results[p2Class.NAME]) results[p2Class.NAME] = {};

      results[p1Class.NAME][p2Class.NAME] = scores;
      results[p2Class.NAME][p1Class.NAME] = getSwappedScore(scores);
    }
  }

  return results;
}

function storeResults(results: Results) {
  const dirPath = path.join(__dirname, '../../data/');
  const filePath = path.join(dirPath, 'results.json');
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(results));
}
const results = runSimulations();
storeResults(results);
