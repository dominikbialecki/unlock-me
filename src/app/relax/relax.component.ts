import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TransmitOnRelaxService} from './transmit-on-relax.service';

@Component({
  selector: 'um-relax',
  template: `
    <ng-container *ngIf="!valid; else validDialog">
      <div class="sleeping"></div>
      <um-number-form class="form" [code]="code" (valid)="valid = true"></um-number-form>
    </ng-container>
    <ng-template #validDialog>
      <um-next-card>
        *zieeeew* która to godzina? Chyba mi się przysnęło.
        Hmmmm odtwórzmy przebieg zdarzeń. Muszę tylko znaleźć zegar.
      </um-next-card>
    </ng-template>
  `,
  styleUrls: ['./relax.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
