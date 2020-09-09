import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'um-egypt-toggle-button',
  template: `
    <img class="toggle" [class.on]="value" alt="palm" src="/assets/egypt/egypt-toggle-icon.svg">
  `,
  styleUrls: ['./egypt-toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EgyptToggleButtonComponent {

  @Input() value = false;

}
