import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TransmitOnRelaxService} from '../../../services/transmit-on-relax.service';
import {CodeVibrationTransmitterService} from '../../../services/code-vibration-transmitter.service';
import {VibrationTransmitter} from '../../../services/vibration-transmitter';
import {NextCardComponent} from '../../../ui-components/next-card/next-card.component';
import {NumberFormComponent} from '../../../ui-components/number-form/number-form.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'um-relax',
  template: `
    @if (!valid) {

      <div class="sleeping"></div>
      <um-number-form class="form" [code]="code" (valid)="valid = true"></um-number-form>
    
} @else {

      <um-next-card>
        *zieeeew* która to godzina? Chyba mi się przysnęło.
        Hmmmm odtwórzmy przebieg zdarzeń. Muszę tylko znaleźć zegar.
      </um-next-card>
    
}
    
  `,
  styleUrls: ['./relax.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    TransmitOnRelaxService,
    {provide: VibrationTransmitter, useExisting: CodeVibrationTransmitterService},
  ],
  standalone: true,
  imports: [NgIf, NumberFormComponent, NextCardComponent]
})
export class RelaxComponent implements OnInit, OnDestroy {

  valid = false;
  private destroy$ = new Subject<boolean>();
  readonly code = [4, 2, 6, 3, 1, 4];

  constructor(private transmit: TransmitOnRelaxService) {
  }

  ngOnInit() {
    this.transmit.transmit(this.code)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
