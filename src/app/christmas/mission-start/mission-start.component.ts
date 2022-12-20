import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'um-mission-start',
  template: `
      <um-note>
          <div class="dialog">
              <div class="dialog-text">
                  <p>
                      Witaj, Joanno! Widzę, że wiadomość dotarła. Całe szczęście...
                  </p>
                  <p>
                      Zauważyliśmy wzmożoną aktywność Grincha. Nie mamy pojęcia co knuje, ale to na pewno nic
                      dobrego! Jeśli szybko go nie powstrzymamy, Święta będą w niebezpieczeństwie... ba, cały świat
                      będzie
                      zagrożony!
                  </p>
                  <p>
                      Tylko Ty możesz go powstrzymać. Jesteś gotowa podjąć się tej misji?
                  </p>
              </div>
              <div class="dialog-answers">
                  <ul>
                      <li><a [routerLink]="['./confirm']">Biorę się do roboty!</a></li>
                      <li><a [routerLink]="['./decline']">Nigdy w życiu. Jestem gburem i nienawidzę świąt.</a>
                      </li>
                  </ul>

              </div>
          </div>
      </um-note>
  `,
  styleUrls: ['./mission-start.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionStartComponent {

}
