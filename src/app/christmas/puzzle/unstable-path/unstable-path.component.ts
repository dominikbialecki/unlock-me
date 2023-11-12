import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, merge, Subject} from 'rxjs';
import {filter, scan, switchMap, take, takeUntil} from 'rxjs/operators';
import {UnstablePathMessageService} from './unstable-path-message.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'um-unstable-path',
  template: `
    @if (position$ | async; as position) {
<div class="map">
      @for (row of map; track row; let y = $index) {
  <div class=map-row
      >
        @for (element of row; track element; let x = $index) {
  <div class="map-element"
            
             (click)="onElementClick(element)"
             [class.active]="position.x === x && position.y === y"
             [class.fallen]="element.fallen$ | async"
        >
          @if (x === position.x && y === position.y) {
<div class="pawn"></div>
}
        </div>
}
      </div>
}
    </div>
}

    <div class="game-over-wrapper">
      <button class="refill-button" [style.visibility]="(gameStatus$ | async) === 'lost' ? 'visible' : 'hidden'"
              mat-mini-fab
              (click)="reset()">
        <mat-icon>replay</mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['./unstable-path.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgFor, MatButtonModule, MatIconModule, AsyncPipe]
})
export class UnstablePathComponent implements OnInit, OnDestroy {
  map: PathElement[][];
  private destroy$ = new Subject<void>();
  private readonly config = {
    maxUnstableInARow: 2,
  };

  position$ = new BehaviorSubject<PathElement>(undefined);
  gameStatus$ = new BehaviorSubject<'won' | 'in progress' | 'lost'>('in progress');

  constructor(private messageService: UnstablePathMessageService) {
  }

  ngOnInit() {

    this.messageService.showWelcomeMessage();
    this.initGame();

    const standsOnFallen$ = this.position$.pipe(
      switchMap(position => position.fallen$),
      filter(fallen => fallen)
    );

    const maxUnstableInARowReached$ = this.position$.pipe(
      scan((unstableCount, curr) => curr.stable ? 0 : unstableCount + 1, 0),
      filter(unstableCount => unstableCount >= this.config.maxUnstableInARow),
    );

    merge(standsOnFallen$, maxUnstableInARowReached$)
      .pipe(
        takeUntil(this.gameStatus$.pipe(filter(status => status === 'won'))),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.gameStatus$.next('lost'));


    this.position$.pipe(
      filter(position => position.y === 0),
      take(1),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.gameStatus$.next('won');
      setTimeout(() => this.messageService.showSuccessMessage(), 1500);
    });
  }

  onElementClick(element: PathElement) {
    const current = this.position$.value;
    const isInProgress = this.gameStatus$.value === 'in progress';
    if (isInProgress && stepAvailablePolicy(current, element)) {
      navigator.vibrate(50);
      element.stepOn();
      this.position$.next(element);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  reset() {
    this.gameStatus$.next('in progress');
    this.initGame();
  }

  private initGame() {
    const map = [
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
      [1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ];
    this.map = map.map((row, y) => {
      return row.map((stable, x) => {
        const steady = y === 0 || y === map.length - 1;
        return new PathElement({x, y, stable, steady});
      });
    });
    const initialElement = this.map[map.length - 1][4];
    this.position$.next(initialElement);
  }
}

class PathElement {
  public x: number;
  public y: number;
  public steady: number;
  public stable: boolean;
  public fallen$ = new BehaviorSubject<boolean>(false);
  private readonly stabilityDuration;

  constructor({x, y, stable, steady}) {
    this.x = x;
    this.y = y;
    this.stable = stable;
    this.steady = steady;
    this.stabilityDuration = steady ? Infinity : stable ? 2500 : 500;
  }

  stepOn() {
    if (!this.steady) {
      setTimeout(() => this.fallen$.next(true), this.stabilityDuration);
    }
  }
}

function stepAvailablePolicy(current: PathElement, next: PathElement): boolean {
  const {x, y} = next;
  const diffX = Math.abs(current.x - x);
  const diffY = Math.abs(current.y - y);
  return diffX + diffY === 1;
}
