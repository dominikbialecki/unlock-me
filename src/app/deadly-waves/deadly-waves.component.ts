import {ChangeDetectionStrategy, Component} from '@angular/core';
import {fromEvent, merge, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'um-deadly-waves',
  template: `
    <ng-container *ngIf="!(offline$ | async); else online">
      <um-description class="card" umPuzzleSolved>
        Niestety, jest już za późno. Udało Ci się zniszczyć maszt, ale czujesz wyraźnie dziurę, którą fale wypaliły w korze prawej półkuli
        mózgu. Czujesz się coraz słabiej...
        <br/>
        <br/>
        Zaraz zaraz. Czy to fatamorgana?
        <um-description class="next">Dalej</um-description>
      </um-description>
    </ng-container>

    <ng-template #online>
      <um-description class="card">
        Jest tylko jeden sposób żeby wygrać tę wojnę. Trzeba zniszczyć maszt!!!
      </um-description>

    </ng-template>
  `,
  styleUrls: ['./deadly-waves.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
