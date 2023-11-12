import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {initialPuzzles} from './initial-puzzles';
import {Puzzle} from './puzzle';
import {PuzzleId} from './puzzle-id';

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
        const availablePuzzles = [...completed];
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
