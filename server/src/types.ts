import { ScoreArray } from '@derzeiss/pong';

export type Results = {
  [barName: string]: {
    score: number;
    matches: {
      [barName: string]: ScoreArray;
    };
  };
};
