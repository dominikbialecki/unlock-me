import {PuzzleId} from './puzzle-id';

export interface Puzzle {
  id: PuzzleId;
  image: string;
  completed: boolean;
  date: string;
  path: string;
}
