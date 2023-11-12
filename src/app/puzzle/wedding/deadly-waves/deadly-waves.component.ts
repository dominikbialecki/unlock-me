import {ChangeDetectionStrategy, Component} from '@angular/core';
import {fromEvent, merge, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {CardComponent} from '../../../ui-components/card/card.component';
import {NextCardComponent} from '../../../ui-components/next-card/next-card.component';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'um-deadly-waves',
  template: `
    <ng-container *ngIf="offline$ | async; else online">
      <um-next-card class="card">
        Niestety, jest już za późno. Udało Ci się zniszczyć maszt, ale czujesz wyraźnie dziurę, którą fale wypaliły w korze prawej półkuli
        mózgu. Czujesz się coraz słabiej...
        <br/>
        <br/>
        Zaraz zaraz. Czy to fatamorgana?
      </um-next-card>
    </ng-container>

    <ng-template #online>
      <um-card class="card">
        Jest tylko jeden sposób żeby wygrać tę wojnę. Trzeba zniszczyć maszt!!!
      </um-card>
    </ng-template>
  `,
  styleUrls: ['./deadly-waves.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NextCardComponent, CardComponent, AsyncPipe]
})
export class DeadlyWavesComponent {
  readonly offline$: Observable<boolean>;

  constructor() {
    this.offline$ = merge(
      fromEvent(window, 'offline').pipe(map(() => true)),
      fromEvent(window, 'online').pipe(map(() => false)),
      of(!navigator.onLine),
    );
  }

}
