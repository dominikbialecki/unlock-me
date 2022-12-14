import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject, interval, Observable, of} from 'rxjs';
import {delay, map, scan, shareReplay, startWith, take, takeLast} from 'rxjs/operators';

interface HitTheMoleConfig {
  newMoleInterval: number;
  lifespan: number;
  quantity: number;
}

class Mole {
  public shouldShow$: Observable<boolean>;
  public top: number;
  public left: number;
  public type: 'dobby' | 'kreacher';
  public isHit = false;
  public runAway = false;
  public size: number;

  constructor(props: { lifespan: number }) {
    this.top = this.randomPosition();
    this.left = this.randomPosition();
    this.type = this.randomMoleType();
    this.size = this.randomSize();
    this.shouldShow$ = of(false).pipe(delay(props.lifespan), startWith(true));
    this.shouldShow$.subscribe({
      complete: () => {
        if (!this.isHit) {
          this.runAway = true;
        }
      }
    });
  }

  onHit(): void {
    this.isHit = true;
  }

  private randomPosition() {
    const random = Math.random() * 100;
    return Math.min(Math.max(random, 5), 95);
  }

  private randomSize() {
    return Math.random() * 8 + 10;
  }

  private randomMoleType() {
    return Math.random() > 0.5 ? 'dobby' : 'kreacher';
  }
}

@Component({
  selector: 'um-hit-the-mole',
  template: `
      <div class="background"></div>
      <div class="wrapper">
          <ng-container *ngIf="allGamesPassed; else game">
              <um-next-card>
                  <p>Gratulacje!</p>
              </um-next-card>
          </ng-container>

          <ng-template #game>
              <button *ngIf="!(started$ | async)"
                      class="ui-button"
                      (click)="start()"
              >
                  START
              </button>

              <div class="mole-container" *ngIf="true">
                  <ng-container *ngFor="let mole of moles$ | async">
                      <div umExplosion="✨"
                           [explodeFromCenter]="true"
                           class="mole"
                           [ngStyle]="{'top.%': mole.top, 'left.%': mole.left, 'width.vmax': mole.size, 'height.vmax': mole.size}"
                           [ngClass]="mole.type"
                           [class.hidden]="!(mole.shouldShow$ | async)"
                           (click)="mole.onHit()"
                      >
                      </div>
                  </ng-container>
              </div>
          </ng-template>
      </div>
  `,
  styleUrls: ['./hit-the-mole.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HitTheMoleComponent {

  mole = new Mole({lifespan: 1000});
  started$ = new BehaviorSubject(false);
  moles$: Observable<Mole[]>;

  private currentGameIndex = 0;
  private games: HitTheMoleConfig[] = [
    {newMoleInterval: 1000, lifespan: 900, quantity: 10},
    {newMoleInterval: 800, lifespan: 700, quantity: 12},
    {newMoleInterval: 600, lifespan: 580, quantity: 14},
  ];

  get allGamesPassed(): boolean {
    return this.currentGameIndex === this.games.length;
  }

  start() {
    this.startGame(this.games[this.currentGameIndex]).subscribe(passed => {
      this.started$.next(false);
      if (passed) {
        this.currentGameIndex++;
      }
    });
  }

  private startGame(config: HitTheMoleConfig): Observable<boolean> {
    this.started$.next(true);

    this.moles$ = this.generateMoles(config);
    return this.moles$.pipe(
      takeLast(1),
      delay(config.lifespan + 1000),
      map((moles) => {
        const positives = moles.filter(mole => mole.type === 'dobby');
        const negatives = moles.filter(mole => mole.type === 'kreacher');
        const positiveHit = positives.filter(mole => mole.isHit).length;
        const negativeHit = moles.filter(mole => mole.isHit).length;
        const passed = negatives.every(mole => mole.isHit) && positives.every(mole => mole.runAway);
        console.log({positives, negatives, positiveHit, negativeHit, passed});
        return passed;
      })
    );
  }

  private generateMoles(config: HitTheMoleConfig) {
    return interval(config.newMoleInterval).pipe(
      take(config.quantity),
      map(() => new Mole({lifespan: config.lifespan})),
      scan((acc, mole) => [...acc, mole], []),
      shareReplay(1),
    );
  }
}
