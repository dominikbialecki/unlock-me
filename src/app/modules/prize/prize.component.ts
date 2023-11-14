import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Prize, PrizeId, PrizeStoreService} from './prize-store.service';
import {CommonModule} from '@angular/common';
import {NoteComponent} from '../../ui-components/note/note.component';
import {Subject} from 'rxjs';
import {bufferTime, filter, map} from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'um-prize',
  template: `
      <um-note class="note">
          <span class="heading">Moje nagrody:</span>
          @if (prizes$ | async;as prizes) {
              <ul>
                  @for (prize of prizes;track prize) {
                      <li
                              [class.used]="prize.usedDate"
                              (click)="onPrizeClick(prize)">
                          <span class="prize-name">{{ prize.name }}</span>
                          @if (prize.usedDate) {
                              <span class="prize-used-date">[{{ prize.usedDate }}]</span>
                          }
                      </li>
                  }
              </ul>
          }
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
  private clickedPrize$ = new Subject<PrizeId>();

  constructor(public prizes: PrizeStoreService) {
    this.clickedPrize$.pipe(
      bufferTime(1000),
      filter((prizes) => prizes.length >= 4),
      map(prizes => prizes[0]),
    ).subscribe((prizeId) => this.prizes.undoMarkAsUsed(prizeId));
  }

  ngOnDestroy() {
    this.clickedPrize$.complete();
    this.clickedPrize$.unsubscribe();
  }

  onPrizeClick(prize: Prize) {
    this.clickedPrize$.next(prize.id);
    if (!prize.usedDate) {
      this.prizes.markAsUsed(prize.id);
    }
  }
}
