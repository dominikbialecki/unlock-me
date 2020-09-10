import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'um-description',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptionComponent {
}
