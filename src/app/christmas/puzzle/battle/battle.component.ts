import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of, Subject, timer} from 'rxjs';
import {filter, map, take, takeUntil} from 'rxjs/operators';
import {BattleMessageService} from './battle-message.service';
import {BatteryService} from '../battery/battery-service';
import {RelaxService} from '../../../services/relax.service';
import {MatButtonModule} from '@angular/material/button';
import {AsyncPipe, NgClass} from '@angular/common';
import {ExplosionDirective} from '../../../ui-components/explosion/explosion.directive';

@Component({
  selector: 'um-battle',
  template: `

    <div class="health-bar__container" [class.low-health]="(missingHealthPercent$ | async) >= 60">
      <div class="health-bar"
           [style.left.%]="-(missingHealthPercent$ | async)"></div>
      <span class="health-bar__text">{{health$ | async}}/{{config.health}}</span>
    </div>
    <div class="grinch-wrapper">
      <div class="grinch" [ngClass]="config.grinchClassName$ | async"
           [class.dead]="(health$ | async) <= 0"
           umExplosion="-1"
           [explodeFromCenter]="true"
           explodeRadius="30"
           [explodePoints]="config.damagePolicy()">
        <button class="hit-button" mat-mini-fab [disabled]="(health$ | async) <= 0" (click)="onHit()">
          <span>⚔️</span>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./battle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ExplosionDirective, NgClass, MatButtonModule, AsyncPipe]
})
export class BattleComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();
  health$: BehaviorSubject<number>;
  missingHealthPercent$: Observable<number>;
  private gameIndex = 0;

  private configs = [
    {
      health: 50,
      healingPerSecond: () => 0,
      damagePolicy: () => 1,
    },
    {
      health: 100,
      healingPerSecond: () => 6,
      damagePolicy: () => 3,
      grinchClassName$: of('left-and-right')
    },
    {
      health: 200,
      healingPerSecond: () => 6,
      damagePolicy: () => 4,
      grinchClassName$: of('random-running')
    },
    {
      health: 200,
      healingPerSecond: () => Math.floor(Math.random() * 20) + 10,
      damagePolicy: () => {
        const isCharging = this.batteryService.isCharging$.getValue();
        return isCharging ? 14 : 4;
      },
      grinchClassName$: of('random-running')
    },
    {
      health: 200,
      healingPerSecond: () => Math.floor(Math.random() * 20) + 10,
      damagePolicy: () => {
        const isNotCharging = !this.batteryService.isCharging$.getValue();
        const isRelaxed = this.relaxService.relaxed$.getValue();
        return isNotCharging && isRelaxed ? 14 : 4;
      },
      grinchClassName$: combineLatest([this.batteryService.isCharging$, this.relaxService.relaxed$]).pipe(
        map(([charging, relaxed]) => `random-running ${relaxed ? '' : 'stressed'} ${charging ? 'overcharged' : ''}`)
      )
    },
  ];

  constructor(private messageService: BattleMessageService,
              private batteryService: BatteryService,
              private relaxService: RelaxService,
  ) {
    this.health$ = new BehaviorSubject<number>(this.config.health);
    this.missingHealthPercent$ = this.health$.pipe(map((health) => (this.config.health - health) * 100 / this.config.health));
  }

  get config() {
    return this.configs[this.gameIndex];
  }

  ngOnInit() {
    this.messageService.showWelcomeMessage().subscribe(() => {
      this.startGame();
    });
  }

  onHit() {
    const dmg = this.configs[this.gameIndex].damagePolicy();
    const health = this.health$.getValue();
    const newHealth = Math.max(health - dmg, 0);
    this.health$.next(newHealth);
  }

  private startGame() {
    this.health$.next(this.config.health);

    const died$ = this.health$.pipe(
      filter((health) => health <= 0),
      take(1),
      takeUntil(this.destroy$),
    );

    timer(1000, 1000).pipe(
      filter(() => this.health$.getValue() < this.config.health),
      takeUntil(died$),
    ).subscribe(() => {
      const healed = this.health$.getValue() + this.config.healingPerSecond();
      const newHealth = Math.min(healed, this.config.health);
      this.health$.next(newHealth);
    });

    died$.subscribe(() => {
      setTimeout(() => {
        this.gameIndex++;
        if (this.gameIndex < this.configs.length) {
          this.startGame();
        } else {
          this.messageService.showWinMessage();
        }
      }, 3000);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
