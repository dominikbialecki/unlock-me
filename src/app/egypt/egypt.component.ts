import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PuzzleSchedulerService} from '../puzzle-scheduler.service';

@Component({
  selector: 'um-egypt',
  template: `
    <p>
      egypt works!
    </p>
    <button (click)="scheduler.onPuzzleSolved()"></button>
  `,
  styleUrls: ['./egypt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EgyptComponent {
  constructor(public scheduler: PuzzleSchedulerService) {
  }
}
