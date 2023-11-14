import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {PuzzleService} from './puzzle/puzzle-service';
import {shareReplay, takeUntil} from 'rxjs/operators';
import {CommonModule} from '@angular/common';
import {CommandCenterMessageService} from './command-center-message.service';
import {Subject} from 'rxjs';
import {PuzzlePortalComponent} from './puzzle-portal/puzzle-portal.component';

@Component({
  standalone: true,
  selector: 'um-command-center',
  template: `
      @if (puzzles$ | async;as puzzles) {

          @for (puzzle of puzzles;track puzzle) {
              <um-puzzle-portal [puzzle]="puzzle"></um-puzzle-portal>
          }

      }
  `,
  styleUrls: ['./command-center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    PuzzlePortalComponent,
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
