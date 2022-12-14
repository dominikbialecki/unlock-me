import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

export interface Puzzle {
  id: string;
  image: string;
  completed: boolean;
  date: string;
  path: string;
}

@Injectable({providedIn: 'root'})
export class PuzzleService {

  private puzzles: Puzzle[] = [
    {
      id: 'harry-potter',
      image: 'assets/christmas/harry-potter.jpg',
      completed: true,
      date: '12-12-2022',
      path: 'christmas/command-center/puzzle/hit-the-mole'
    },
    {
      id: 'memory',
      image: 'assets/christmas/memory.jpg',
      completed: true,
      date: '12-12-2022',
      path: 'christmas/command-center/puzzle/memory'
    },
    {
      id: 'drum',
      image: 'assets/christmas/drum/drum-poster.png',
      completed: true,
      date: '12-12-2022',
      path: 'christmas/command-center/puzzle/drum'
    },
    {
      id: 'third',
      image: 'assets/christmas/harry-potter.jpg',
      completed: false,
      date: '24-12-2022',
      path: 'christmas/command-center/puzzle/third'
    },
  ];

  getPuzzles(): Observable<Puzzle[]> {
    const completed = this.puzzles.filter(puzzle => puzzle.completed);
    const nextToComplete = this.puzzles.find(puzzle => !puzzle.completed);
    return of([...completed, nextToComplete].reverse());
  }
}
