import { ScoreArray } from "@derzeiss/pong";

export type Results = {
  [barName: string]: {
    [barName: string]: ScoreArray;
  };
};