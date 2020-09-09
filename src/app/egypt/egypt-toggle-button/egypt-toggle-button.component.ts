import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

@Component({
  selector: 'um-egypt-toggle-button',
  template: ``,
  styleUrls: ['./egypt-toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EgyptToggleButtonComponent {

  @HostBinding('class.on') @Input() value = false;

}
