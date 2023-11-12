import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NextCardComponent} from '../../../ui-components/next-card/next-card.component';
import {NumberFormComponent} from '../../../ui-components/number-form/number-form.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'um-home',
  template: `
    <div class="dog bulldog"></div>
    <div class="dog corgi-1"></div>
    <div class="dog spaniel"></div>
    <div class="dog puppy"></div>
    <div class="dog corgi-2"></div>

    <ng-container *ngIf="!valid; else validDialog">
      <div class="sleeping"></div>
      <um-number-form class="form" [code]="code" (valid)="valid = true"></um-number-form>
    </ng-container>
    <ng-template #validDialog>
      <um-next-card>
        *zieeeew* która to godzina? Chyba mi się przysnęło.
        Hmmmm odtwórzmy przebieg zdarzeń. Muszę tylko znaleźć zegar.
      </um-next-card>
    </ng-template>
  `,
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NumberFormComponent, NextCardComponent]
})
export class HomeComponent {
  valid = false;
  readonly code = [8, 3, 8, 9, 5];
}
