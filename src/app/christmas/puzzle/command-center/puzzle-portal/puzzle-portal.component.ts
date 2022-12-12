import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Puzzle} from '../puzzle-service';

@Component({
  selector: 'um-puzzle-portal',
  template: `
      <div class="container">
          <div class="tv">
              <input type="checkbox" class="switchinput" checked>
              <div class="switch"></div>
              <img [alt]="puzzle.id" class="image" [src]="puzzle.image">
              <div class="cover crt"></div>
          </div>
      </div>
  `,
  styleUrls: ['./puzzle-portal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PuzzlePortalComponent {
  @Input() puzzle: Puzzle;
}
