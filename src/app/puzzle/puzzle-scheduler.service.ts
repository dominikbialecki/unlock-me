import {Injectable, Type} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PuzzleSchedulerService {

  private currentPuzzleIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  private puzzles: Type<unknown>[] = [];

  register(...components: Type<unknown>[]) {
    this.puzzles.push(...components);
  }

  onPuzzleSolved(): void {
    this.currentPuzzleIndex$.next(this.currentPuzzleIndex$.getValue() + 1);
  }

  get currentPuzzle$(): Observable<Type<unknown>> {
    return this.currentPuzzleIndex$.pipe(
      map(idx => this.puzzles[idx]),
      filter(puzzle => !!puzzle)
    );
  }
}
