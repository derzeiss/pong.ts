import { CopyLowInt, LowIntelligenceAIBar, RandomBar } from './AiBar';
import { Bar } from './Bar';
import { Game } from './Game';
import { ScoreArray } from './types';

// package exports
const ais:typeof Bar[] = [
  LowIntelligenceAIBar,
  CopyLowInt,
  RandomBar
];

export { Game, ais, ScoreArray };

(() => {
  // start game if we are inside the browser
  if (typeof document === 'undefined') return;

  const g = new Game(LowIntelligenceAIBar, LowIntelligenceAIBar, 'game-canvas');
  console.log(g.simulate(1000));
  g.run();
})();
