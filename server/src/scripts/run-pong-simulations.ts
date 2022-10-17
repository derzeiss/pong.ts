import { ais, Game, IBar, ScoreArray, SimulationResults } from '@derzeiss/pong';
import fs from 'fs';
import path from 'path';

const NO_OF_SIMULATIONS = 1000;

const getSwappedScore: (results: ScoreArray) => ScoreArray = (results) => [
  results[0],
  results[2],
  results[1],
];

function runSimulations() {
  let results: SimulationResults = {};

  // print simulation-log header
  console.log('Running simulation \n--');
  console.log(['#', 'id #1', 'id #2', 'Bar.NAME', 'Bar.name'].join('\t'));
  console.log(Array(7).fill('-------').join('\t'));

  for (let i = 0; i < ais.length; i++) {
    if (i == ais.length - 1) break;
    const p1Class = ais[i];
    _logSimulationStep(1, i, '', p1Class);

    for (let j = i + 1; j < ais.length; j++) {
      const p2Class = ais[j];
      _logSimulationStep(2, i, j, p2Class);

      const g = new Game(p1Class, p2Class);
      const scores = g.simulate(NO_OF_SIMULATIONS);

      if (!results[p1Class.NAME]) results[p1Class.NAME] = { score: 0, matches: {} };
      if (!results[p2Class.NAME]) results[p2Class.NAME] = { score: 0, matches: {} };

      results[p1Class.NAME].matches[p2Class.NAME] = scores;
      results[p2Class.NAME].matches[p1Class.NAME] = getSwappedScore(scores);
    }
    console.log('');
  }
  return results;
}

function _logSimulationStep(pId: number, i: number, j: number | string, cls: IBar) {
  const clsNameGiven = cls.NAME + (cls.NAME.length < 8 ? '\t' : '');
  console.log([`p${pId}`, i, j, clsNameGiven, cls.name].join('\t'));
}

/**
 * Calculates a score for each result item which is the average number of wins.
 * @param results result data to inject scores to.
 */
function calcScores(results: SimulationResults) {
  Object.keys(results).forEach((p1Name) => {
    const p1Data = results[p1Name];
    const p2Names = Object.keys(p1Data.matches);
    const scoreSum = p2Names.reduce((score, p2Name) => {
      const p2Data = p1Data.matches[p2Name];
      score += p2Data[1];
      return score;
    }, 0);
    const score = scoreSum / p2Names.length;
    p1Data.score = score;
  });
}

function storeResults(results: SimulationResults) {
  const dirPath = path.join(__dirname, '../../data/');
  const filePath = path.join(dirPath, 'results.json');
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(results));
}
const results = runSimulations();
calcScores(results);
storeResults(results);
