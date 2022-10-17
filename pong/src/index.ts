import { LowIntelligenceAIBar, RandomBar } from './ais/AiBar';
import { Bar, IBar } from './Bar';
import { Game } from './Game';
import { ScoreArray, SimulationResults } from './types';

// package exports
const ais: IBar[] = [LowIntelligenceAIBar, RandomBar];

export {
  // classes
  Game,
  // data
  ais,
  // types
  SimulationResults,
  ScoreArray,
  IBar,
};

(() => {
  // make sure we are in a real browser before starting a game.
  if (typeof document === 'undefined') return;

  const g = new Game(Bar, LowIntelligenceAIBar, 'game-canvas');
  //console.log(g.simulate(1000));  // comment in this line to simulate 1000 games between these two classes before actually starting a game
  g.run();
})();
