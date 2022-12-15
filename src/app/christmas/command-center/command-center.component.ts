import {ChangeDetectionStrategy, Component, HostListener} from '@angular/core';
import {PuzzleService} from './puzzle-service';
import {shareReplay} from 'rxjs/operators';
import {CommonModule} from '@angular/common';
import {PuzzleModule} from '../puzzle/puzzle.module';

@Component({
  standalone: true,
  selector: 'um-command-center',
  template: `
    <ng-container *ngIf="puzzles$ | async as puzzles">
      <um-puzzle-portal *ngFor="let puzzle of puzzles" [puzzle]="puzzle"></um-puzzle-portal>
    </ng-container>
  `,
  styleUrls: ['./command-center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    PuzzleModule,
  ]
})
export class CommandCenterComponent {
  puzzles$ = this.puzzleService.getPuzzles().pipe(shareReplay(1));

  constructor(private puzzleService: PuzzleService) {
  }
}
