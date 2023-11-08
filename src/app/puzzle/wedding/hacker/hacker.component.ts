import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {debounceTime, filter, first, map, takeUntil} from 'rxjs/operators';
import {PuzzleSchedulerService} from '../../puzzle-scheduler.service';

@Component({
  selector: 'um-hacker',
  template: `
    <um-matrix class="matrix" [class.blur]="valid$ | async"></um-matrix>

    <ng-container *ngIf="(valid$ | async) === false">
      <um-card>Mam_jeszcz3 tr0chę cza$u zanim D0minik wróc1... zd4żę sprawdz1ć co tam ost4tnio komb1nował!
        Muszę ty1ko wejść w j3go buty...
      </um-card>

      <input class="form" #input (input)="value$.next(input.value)"/>
    </ng-container>

  `,
  styleUrls: ['./hacker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HackerComponent implements OnInit, OnDestroy {

  private readonly code = 'K0CH4M C13';

  destroy$ = new Subject<void>();
  value$: BehaviorSubject<string> = new BehaviorSubject('');
  valid$ = this.value$.pipe(map(
    value => value.toLocaleLowerCase() === this.code.toLocaleLowerCase()
  ));

  constructor(private puzzle: PuzzleSchedulerService) {
  }

  ngOnInit() {
    this.valid$.pipe(
      filter(Boolean),
      debounceTime(8000),
      first(),
      takeUntil(this.destroy$)
    ).subscribe(() => this.puzzle.onPuzzleSolved());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
