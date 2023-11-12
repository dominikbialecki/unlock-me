import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, interval, Observable, of, Subject} from 'rxjs';
import {delay, map, scan, shareReplay, startWith, take, takeLast, takeUntil} from 'rxjs/operators';
import {HitTheMoleMessageService} from './hit-the-mole-message.service';
import {ExplosionDirective} from '../../../ui-components/explosion/explosion.directive';
import {AsyncPipe, NgClass, NgFor, NgIf, NgStyle} from '@angular/common';

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
      @if (started$ | async) {
<div class="mole-container">
        @for (mole of moles$ | async; track mole) {
  
          <div umExplosion="✨"
               [explodeFromCenter]="true"
               class="mole"
               [ngStyle]="{'top.%': mole.top, 'left.%': mole.left, 'width.vmax': mole.size, 'height.vmax': mole.size}"
               [ngClass]="mole.type"
               [class.hidden]="!(mole.shouldShow$ | async)"
               (click)="mole.onHit()"
          >
          </div>
        
}
      </div>
}
    </div>
  `,
  styleUrls: ['./hit-the-mole.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ExplosionDirective,
    NgStyle,
    NgClass,
    AsyncPipe,
  ],
})
export class HitTheMoleComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();
  started$ = new BehaviorSubject(false);
  moles$: Observable<Mole[]>;

  constructor(private messageService: HitTheMoleMessageService) {
  }

  ngOnInit() {
    this.messageService.showWelcomeMessage().subscribe(() => {
      this.start();
    });
  }

  private currentGameIndex = 0;
  private games: HitTheMoleConfig[] = [
    {newMoleInterval: 1000, lifespan: 900, quantity: 10},
    {newMoleInterval: 900, lifespan: 850, quantity: 12},
    {newMoleInterval: 800, lifespan: 700, quantity: 14},
  ];

  start() {
    this.startGame(this.games[this.currentGameIndex])
      .pipe(takeUntil(this.destroy$))
      .subscribe(passed => {
        this.started$.next(false);
        if (passed) {
          this.currentGameIndex++;
        }
        if (!passed) {
          this.messageService.showLoseMessage().subscribe(() => this.start());
        } else if (this.currentGameIndex === this.games.length) {
          this.messageService.showWinMessage();
        } else {
          this.messageService.showNextLevelMessage().subscribe(() => this.start());
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
