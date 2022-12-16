import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {PuzzleService} from './puzzle-service';
import {shareReplay, takeUntil} from 'rxjs/operators';
import {CommonModule} from '@angular/common';
import {PuzzleModule} from '../puzzle/puzzle.module';
import {CommandCenterMessageService} from './command-center-message.service';
import {Subject} from 'rxjs';

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
export class CommandCenterComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  puzzles$ = this.puzzleService.getPuzzles().pipe(shareReplay(1));

  constructor(private puzzleService: PuzzleService,
              private messageService: CommandCenterMessageService,
  ) {
  }

  ngOnInit(): void {
    this.puzzles$
      .pipe(takeUntil(this.destroy$))
      .subscribe((puzzles) => {
        this.messageService.showMessage(puzzles);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
