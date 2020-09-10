import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'um-description',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DescriptionComponent {
  @Input() @HostBinding('class') color: 'light' | 'dark' | 'success' = 'light';
}
