import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'um-mission-start-confirm',
  template: `
    <um-note>
      <div class="dialog">
        <div class="dialog-text">
          <p>
            Doskonale! Zaczynajmy więc.
          </p>
          <p>
            Złapanie Grincha nie będzie takie proste. Ten skurczybyk jest sprytny i na pewno nie da się złapać
            po
            dobroci. Musisz go przechytrzyć.
          </p>
          <p>
            Dalsze szczegóły poznasz w naszym centrum dowodzenia. Dostaniesz się do niego z poziomu ekranu
            głównego.
          </p>
          <p>Powodzenia i do zobaczenia!</p>
        </div>
      </div>
    </um-note>
  `,
  styleUrls: ['./mission-start-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionStartConfirmComponent {

}
