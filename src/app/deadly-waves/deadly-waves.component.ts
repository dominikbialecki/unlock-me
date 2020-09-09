import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PuzzleSchedulerService} from '../puzzle-scheduler.service';
import {fromEvent, merge, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'um-deadly-waves',
  template: `
    <ng-container *ngIf="(offline$ | async); else online">
      Udało się!
      <button (click)="scheduler.onPuzzleSolved()">Solve!</button>
    </ng-container>

    <ng-template #online>
      Maszty są coraz silniejsze! Czuję, że czapka przestaje wystarczać... Muszę jak najszybciej zniszczyć źródło fal.
    </ng-template>
  `,
  styleUrls: ['./deadly-waves.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeadlyWavesComponent {
  readonly offline$: Observable<boolean>;

  constructor(public scheduler: PuzzleSchedulerService) {
    this.offline$ = merge(
      fromEvent(window, 'offline').pipe(map(() => true)),
      fromEvent(window, 'online').pipe(map(() => false)),
      of(!navigator.onLine),
    );
  }

}
