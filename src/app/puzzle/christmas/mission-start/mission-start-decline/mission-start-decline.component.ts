import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'um-mission-start-decline',
  template: `
    <div class="dialog">
      <div class="dialog-text">
        <p>
          Foch.
        </p>
      </div>
      <div class="dialog-answers">
        <button class="ui-button" [routerLink]="['../confirm']">No dobra niech Ci będzie</button>
      </div>
    </div>
  `,
  styleUrls: ['./mission-start-decline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionStartDeclineComponent {

}
