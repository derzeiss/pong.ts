import { CopyLowInt, LowIntelligenceAIBar, RandomBar } from './AiBar';
import { Bar } from './Bar';
import { Game } from './Game';
import { ScoreArray, SimulationResults } from './types';

// package exports
const ais: typeof Bar[] = [LowIntelligenceAIBar, CopyLowInt, RandomBar];

export {
  // classes
  Game,
  // data
  ais,
  // types
  SimulationResults,
  ScoreArray,
};

(() => {
  // start game if we are inside the browser
  if (typeof document === 'undefined') return;

  const g = new Game(LowIntelligenceAIBar, LowIntelligenceAIBar, 'game-canvas');
  console.log(g.simulate(1000));
  g.run();
})();
