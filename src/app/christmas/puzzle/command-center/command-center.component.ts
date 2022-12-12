import {ChangeDetectionStrategy, Component} from '@angular/core';
import {PuzzleService} from './puzzle-service';
import {shareReplay} from 'rxjs/operators';

@Component({
  selector: 'um-command-center',
  template: `
    <ng-container *ngIf="puzzles$ | async as puzzles">
      <um-puzzle-portal *ngFor="let puzzle of puzzles" [puzzle]="puzzle"></um-puzzle-portal>
    </ng-container>
  `,
  styleUrls: ['./command-center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandCenterComponent {
  puzzles$ = this.puzzleService.getPuzzles().pipe(shareReplay(1));

  constructor(private puzzleService: PuzzleService) {
  }
}
