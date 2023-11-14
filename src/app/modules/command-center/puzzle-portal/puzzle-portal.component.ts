import {ChangeDetectionStrategy, Component, HostBinding, HostListener, Input, OnChanges} from '@angular/core';
import * as dayjs from 'dayjs';
import {interval, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AsyncPipe, NgIf} from '@angular/common';
import {Puzzle} from '../puzzle/puzzle';

@Component({
  selector: 'um-puzzle-portal',
  template: `
      <div class="container">
          <div class="tv">
              <div class="switch"></div>
              <img [alt]="puzzle.id" class="image" [src]="src">
              <div class="cover crt"></div>
              @if (!isActive) {
                  <div class="duration-container">
                      <span>{{ timeUntilActivation$ | async }}</span>
                  </div>
              }
          </div>
      </div>
  `,
  styleUrls: ['./puzzle-portal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, AsyncPipe]
})
export class PuzzlePortalComponent implements OnChanges {

  isActive: boolean;
  timeUntilActivation$: Observable<unknown>;
  src: string;
  @HostBinding('class.selected') selected = false;

  @Input() puzzle: Puzzle;

  constructor(private router: Router) {
  }

  ngOnChanges() {
    const date = dayjs(this.puzzle?.date, 'DD-MM-YYYY');
    this.isActive = dayjs().isAfter(date);
    this.timeUntilActivation$ = interval(1000).pipe(
      map(() => dayjs.duration(date.diff(dayjs())).format('HH:mm:ss')),
    );
    this.src = this.isActive ? this.puzzle.image : 'assets/no-signal-tv.gif';
  }

  @HostListener('click')
  onClick() {
    if (this.isActive) {
      this.selected = true;
      setTimeout(() => this.router.navigate([this.puzzle.path]), 400);
    }
  }
}
