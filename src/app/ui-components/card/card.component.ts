import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'um-card',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class CardComponent {
  @Input() @HostBinding('class') color: 'light' | 'dark' | 'success' = 'light';
}
