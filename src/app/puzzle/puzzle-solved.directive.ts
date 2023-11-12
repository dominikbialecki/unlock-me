import {Directive, HostListener, Input} from '@angular/core';
import {PuzzleSchedulerService} from './puzzle-scheduler.service';

@Directive({
  selector: '[umPuzzleSolved]',
  standalone: true
})
export class PuzzleSolvedDirective {
  @Input() disabled = false;

  constructor(private scheduler: PuzzleSchedulerService) {
  }

  @HostListener('click') onClick(): void {
    if (!this.disabled) {
      this.scheduler.onPuzzleSolved();
    }
  }
}
