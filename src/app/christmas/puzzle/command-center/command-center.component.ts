import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'um-command-center',
  template: `
    <p>
      command-center works!
    </p>
  `,
  styleUrls: ['./command-center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandCenterComponent {

}
