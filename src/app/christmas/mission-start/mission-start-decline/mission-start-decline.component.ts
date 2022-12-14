import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'um-mission-start-decline',
  template: `
      <um-note>
          <div class="dialog">
              <div class="dialog-text">
                  <p>
                      No to nara świąt nie będzie.
                  </p>
              </div>
              <div class="dialog-answers">
                <ul>
                  <li>
                    <a [routerLink]="['../confirm']">No dobra niech Ci będzie</a>
                  </li>
                </ul>
              </div>
          </div>
      </um-note>
  `,
  styleUrls: ['./mission-start-decline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionStartDeclineComponent {

}
