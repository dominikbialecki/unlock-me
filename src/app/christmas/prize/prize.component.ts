import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PrizeService} from './prize.service';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  selector: 'um-prize',
  template: `
    <div *ngIf="prizes$ | async as prizes">
      <div *ngFor="let prize of prizes">
        {{prize.name}}
      </div>
    </div>
  `,
  styleUrls: ['./prize.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
  ]
})
export class PrizeComponent {

  prizes$ = this.prizes.getPrizes();

  constructor(private prizes: PrizeService) {
  }
}
