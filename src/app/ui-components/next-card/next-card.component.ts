import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'um-next-card',
  template: `
      <um-card>
          <ng-content></ng-content>
          <button class="ui-button" umPuzzleSolved>DALEJ</button>
      </um-card>
  `,
  styleUrls: ['./next-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CardComponent]
})
export class NextCardComponent {
}
