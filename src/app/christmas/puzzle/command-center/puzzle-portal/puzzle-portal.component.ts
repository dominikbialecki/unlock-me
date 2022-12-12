import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'um-puzzle-portal',
  template: `
    <p>
      puzzle-portal works!
    </p>
  `,
  styleUrls: ['./puzzle-portal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PuzzlePortalComponent {

}
