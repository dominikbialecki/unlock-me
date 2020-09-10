import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TransmitOnRelaxService} from './transmit-on-relax.service';

@Component({
  selector: 'um-relax',
  template: `

    <um-card class="form">
      <input *ngFor="let c of code"
             type="number"
             min="0"
             max="10">
    </um-card>
  `,
  styleUrls: ['./relax.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelaxComponent implements OnInit, OnDestroy {

  readonly code = [4, 2, 6, 3, 1, 4];
  private destroy$ = new Subject<boolean>();

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
