import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';

export interface Puzzle {
  id: PuzzleId;
  image: string;
  completed: boolean;
  date: string;
  path: string;
}

export enum PuzzleId {
  HarryPotter = 'harry-potter',
  Memory = 'memory',
  Drum = 'drum',
  UnstablePath = 'unstable-path',
  Todo = 'todo',
}

const initialPuzzles: Puzzle[] = [
  {
    id: PuzzleId.UnstablePath,
    image: 'assets/christmas/unstable-path/indiana-jones-poster.jpg',
    completed: false,
    date: '12-12-2022',
    path: 'christmas/command-center/puzzle/unstable-path',
  },
  {
    id: PuzzleId.HarryPotter,
    image: 'assets/christmas/harry-potter.jpg',
    completed: false,
    date: '12-12-2022',
    path: 'christmas/command-center/puzzle/hit-the-mole'
  },
  {
    id: PuzzleId.Memory,
    image: 'assets/christmas/memory/memory-poster.jpg',
    completed: false,
    date: '12-12-2022',
    path: 'christmas/command-center/puzzle/memory'
  },
  {
    id: PuzzleId.Drum,
    image: 'assets/christmas/drum/drum-poster.png',
    completed: false,
    date: '12-12-2022',
    path: 'christmas/command-center/puzzle/drum'
  },
  {
    id: PuzzleId.Todo,
    image: 'assets/christmas/harry-potter.jpg',
    completed: false,
    date: '12-12-2022',
    path: 'christmas/command-center/puzzle/third'
  },
];

@Injectable({providedIn: 'root'})
export class PuzzleService {

  private readonly puzzleKey = 'puzzles';
  private puzzles$ = new BehaviorSubject<Puzzle[]>([]);

  constructor() {
    const savedPuzzles = localStorage.getItem(this.puzzleKey);
    const puzzles = this.refreshSavedPrizes(savedPuzzles ? JSON.parse(savedPuzzles) : undefined);
    this.storePuzzles(puzzles);
  }

  getPuzzles(): Observable<Puzzle[]> {
    return this.puzzles$.pipe(
      map((puzzles) => {
        const completed = puzzles.filter(puzzle => puzzle.completed);
        const nextToComplete = puzzles.find(puzzle => !puzzle.completed);
        const availablePuzzles = [...completed]
        if (nextToComplete) {
          availablePuzzles.push(nextToComplete);
        }
        return availablePuzzles.reverse();
      }),
    );
  }

  marAsCompleted(puzzleId: PuzzleId): void {
    const puzzles = this.puzzles$.getValue().map(puzzle => puzzle.id === puzzleId ? {
      ...puzzle,
      completed: true
    } : puzzle);
    this.storePuzzles(puzzles);
  }

  private refreshSavedPrizes(savedPuzzles?: Puzzle[]): Puzzle[] {
    if (!savedPuzzles) {
      return [...initialPuzzles];
    } else {
      return initialPuzzles.map(initialPuzzle => {
        const savedPrize = savedPuzzles.find(savedPrize => savedPrize.id === initialPuzzle.id);
        return {
          ...initialPuzzle,
          completed: savedPrize?.completed ?? false,
        };
      });
    }
  }

  private storePuzzles(puzzles: Puzzle[]): void {
    this.puzzles$.next(puzzles);
    localStorage.setItem(this.puzzleKey, JSON.stringify(puzzles));
  }
}