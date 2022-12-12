import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {merge, of, Subject} from 'rxjs';
import {TransmitOnRelaxService} from '../../../services/transmit-on-relax.service';
import {delay, filter, finalize, map, scan, takeUntil, tap} from 'rxjs/operators';
import * as dayjs from 'dayjs';
import {VibrationTransmitter} from '../../../services/vibration-transmitter';
import {RhythmVibrationTransmitterService} from './rhythm-vibration-transmitter.service';

@Component({
  selector: 'um-drum-puzzle',
  template: `
    <ng-container *ngIf="!valid else solved">
      <div class="drum" (click)="onDrumClick()">DRUM</div>
    </ng-container>

    <ng-template #solved>
      <um-next-card>
        Gratulacje!
      </um-next-card>
    </ng-template>

  `,
  styleUrls: ['./drum-puzzle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TransmitOnRelaxService,
    {provide: VibrationTransmitter, useExisting: RhythmVibrationTransmitterService},
  ]
})
export class DrumPuzzleComponent implements OnInit, OnDestroy {

  valid = false;
  private destroy$ = new Subject<boolean>();
  readonly rhythm = [0, 410, 389, 175, 203, 378, 179, 196, 187, 382, 178];
  private isListening = false;
  private clicks$ = new Subject();

  constructor(private transmit: TransmitOnRelaxService) {
  }

  ngOnInit() {
    this.transmit.transmit(this.rhythm)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDrumClick() {
    if (!this.isListening) {
      this.validateRhythm();
    }

    this.clicks$.next();
  }

  private validateRhythm() {
    const resetTime = 5 * 1000;
    const reset$ = of(1).pipe(delay(resetTime));
    this.isListening = true;

    this.clicks$.pipe(
      finalize(() => this.isListening = false),
      map(() => dayjs()),
      scan((acc, mole) => [...acc, mole], []),
      map((dates) => dates.map((date, i) => date.diff(dates[i - 1] || date, 'ms'))),
      takeUntil(merge(reset$, this.destroy$)),
      tap(console.log),
      filter((rhythm) => rhythm.length === this.rhythm.length),
      map((rhythm) => compareRhythm(this.rhythm, rhythm)),
    ).subscribe(valid => {
      console.log('valid:', valid);
      this.valid = valid;
    });
  }
}

function compareRhythm(expected: number[], test: number[]): boolean {
  return expected.every((value, i) => Math.abs(value - test[i]) < 100);
}
