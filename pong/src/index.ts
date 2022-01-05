import { LowIntelligenceAIBar } from './AiBar';
import { Bar } from './Bar';
import { Game } from './Game';

// package exports
export { Game, Bar, LowIntelligenceAIBar };

(() => {
  // start game if we are inside the browser
  if (typeof document === 'undefined') return;

  const g = new Game(LowIntelligenceAIBar, LowIntelligenceAIBar, 'game-canvas');
  console.log(g.simulate(1000));
  g.run();
})();
