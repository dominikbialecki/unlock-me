import {Directive, HostListener} from '@angular/core';
import {PuzzleSchedulerService} from './puzzle-scheduler.service';

@Directive({
  selector: '[umPuzzleSolved]'
})
export class PuzzleSolvedDirective {
  constructor(private scheduler: PuzzleSchedulerService) {
  }

  @HostListener('click') onClick(): void {
    this.scheduler.onPuzzleSolved();
  }
}
