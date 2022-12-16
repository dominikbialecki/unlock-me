import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'um-unstable-path',
  template: `
      {{gameOver$ | async}}
      <ng-container *ngIf="!(gameOver$ | async) else gameOver">
          <ng-container *ngIf="position$ | async as position">
              <div class=map-row *ngFor="let row of map; let y = index">
                  <div class="map-element"
                       *ngFor="let element of row; let x = index"
                       (click)="onElementClick(element)"
                       [class.active]="x === position.x && y === position.y"
                  ></div>
              </div>
          </ng-container>
      </ng-container>

      <ng-template #gameOver>
          <div class="game-over-wrapper">
              <button class="refill-button" mat-mini-fab (click)="reset()">
                  <mat-icon>cookie</mat-icon>
              </button>
          </div>
      </ng-template>
  `,
  styleUrls: ['./unstable-path.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnstablePathComponent implements OnInit, OnDestroy {
  map: PathElement[][];
  private destroy$ = new Subject<void>();
  private readonly config = {
    stepMaxTime: 3000,
  };

  position$ = new BehaviorSubject<PathElement>(undefined);
  gameOver$ = new BehaviorSubject(false);

  constructor() {
  }

  ngOnInit() {
    this.initGame();
    this.position$
      .pipe()
      .subscribe(element => {
        if (!element.stable) {
          this.gameOver$.next(true);
        }
      });
  }

  onElementClick(element: PathElement) {
    const current = this.position$.value;
    if (stepAvailablePolicy(current, element)) {
      this.position$.next(element);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  reset() {
    this.gameOver$.next(false);
    this.initGame();
  }

  private initGame() {
    const map = [
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    ];
    this.map = map.map((row, y) => {
      return row.map((stable, x) => new PathElement({x, y, stable}));
    });
    const initialElement = this.map[9][4];
    this.position$.next(initialElement);
  }
}

class PathElement {
  public x: number;
  public y: number;
  public stable: boolean;
  public fall= false;

  constructor({x, y, stable}) {
    this.x = x;
    this.y = y;
    this.stable = stable;
  }
}

function stepAvailablePolicy(current: PathElement, next: PathElement): boolean {
  const {x, y} = next;
  const movedX = Math.abs(current.x - x) === 1;
  const movedY = Math.abs(current.y - y) === 1;
  return movedX || movedY;
}
