import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Prize, PrizeService} from './prize.service';
import {CommonModule} from '@angular/common';
import {NoteComponent} from '../../ui-components/note/note.component';
import {Subject} from 'rxjs';
import {bufferTime, filter, map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'um-prize',
  template: `
      <um-note class="note">
          <ul *ngIf="prizes$ | async as prizes">
              <li *ngFor="let prize of prizes"
                  class="note"
                  [class.used]="prize.used"
                  (click)="onPrizeClick(prize)">
                  {{prize.name}}
              </li>
          </ul>
      </um-note>
  `,
  styleUrls: ['./prize.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NoteComponent,
  ]
})
export class PrizeComponent implements OnDestroy {

  prizes$ = this.prizes.getPrizes();
  private clickedPrize$ = new Subject<number>();

  constructor(public prizes: PrizeService) {
    this.clickedPrize$.pipe(
      bufferTime(1000),
      filter((prizes) => prizes.length >= 4),
      map(prizes => prizes[0]),
    ).subscribe((prizeId) => this.prizes.undoMarkAsUsed(prizeId))
  }

  ngOnDestroy() {
    this.clickedPrize$.complete();
    this.clickedPrize$.unsubscribe();
  }

  onPrizeClick(prize: Prize) {
    this.clickedPrize$.next(prize.id);
    if (!prize.used) {
      this.prizes.markAsUsed(prize.id);
    }
  }
}
