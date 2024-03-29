import {ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {merge, of, Subject} from 'rxjs';
import {TransmitOnRelaxService} from '../../../services/transmit-on-relax.service';
import {delay, filter, finalize, map, scan, takeUntil, tap} from 'rxjs/operators';
import dayjs from 'dayjs';
import {VibrationTransmitter} from '../../../services/vibration-transmitter';
import {RhythmVibrationTransmitterService} from './rhythm-vibration-transmitter.service';
import {DrumPuzzleMessageService} from './drum-puzzle-message.service';

@Component({
  selector: 'um-drum-puzzle',
  template: `
      <div class="drum" (click)="onDrumClick()"></div>
  `,
  styleUrls: ['./drum-puzzle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TransmitOnRelaxService,
    {provide: VibrationTransmitter, useExisting: RhythmVibrationTransmitterService},
  ],
  standalone: true
})
export class DrumPuzzleComponent implements OnInit, OnDestroy {

  @HostBinding('class.valid')
  valid = false;
  private destroy$ = new Subject<boolean>();
  readonly rhythm = [400, 400, 200, 200, 400, 200, 200, 200, 400, 200, 200];
  private isListening = false;
  private clicks$ = new Subject();

  constructor(private transmit: TransmitOnRelaxService,
              private messageService: DrumPuzzleMessageService,
              private changeDetector: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.messageService.showWelcomeMessage().subscribe(() => {
      this.transmit.transmit(this.rhythm)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onDrumClick() {
    navigator.vibrate(100);

    if (!this.isListening) {
      this.validateRhythm();
    }

    this.clicks$.next();
  }

  private validateRhythm() {
    const resetTime = 10 * 1000;
    const reset$ = of(1).pipe(delay(resetTime));
    this.isListening = true;

    this.clicks$.pipe(
      finalize(() => this.isListening = false),
      map(() => dayjs()),
      scan((acc, date) => [...acc, date], []),
      map((dates) => dates.map((date, i) => dates[i + 1]?.diff(date, 'ms') || this.rhythm[this.rhythm.length - 1])),
      takeUntil(merge(reset$, this.destroy$)),
      tap(console.log),
      filter((rhythm) => rhythm.length === this.rhythm.length),
      map((rhythm) => compareRhythm(this.rhythm, rhythm)),
    ).subscribe(valid => {
      console.log('valid:', valid);
      this.valid = valid;
      this.changeDetector.detectChanges();
      if (valid) {
        setTimeout(() => this.messageService.showSuccessMessage(), 3000);
      }
    });
  }
}

function compareRhythm(expected: number[], test: number[]): boolean {
  return expected.every((value, i) => Math.abs(value - test[i]) < 100);
}
