import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {SongAnagramMessageService} from './song-anagram-message.service';
import {filter, map, takeUntil} from 'rxjs/operators';
import {emojiSongs} from './songs';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ExplosionDirective} from '../../../ui-components/explosion/explosion.directive';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'um-song-anagram',
  template: `
      @if (currentPuzzle$ | async;as song) {

          <div class="song">
              @for (word of song;track word) {
                  <div
                          class="word"
                          umExplosion="🧱"
                          [class.used]="word.isUsed"
                          (click)="onWordClick(word)"
                  >
                      <span>{{ word.text }}</span>
                  </div>
              }
          </div>

          <div class="refresh">
              <button class="refresh-button transparent-bg"
                      mat-mini-fab
                      (click)="reset(song)">
                  <mat-icon>replay</mat-icon>
              </button>
          </div>

      }
  `,
  styleUrls: ['./song-anagram.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgFor, ExplosionDirective, MatButtonModule, MatIconModule, AsyncPipe]
})
export class SongAnagramComponent implements OnInit, OnDestroy {
  songs = emojiSongs;

  currentPuzzle$: Observable<Word[]>;
  currentSongIdx$ = new BehaviorSubject(0);
  destroy$ = new Subject();
  answer$ = new BehaviorSubject<string[]>([]);

  constructor(private messageService: SongAnagramMessageService) {
    this.currentPuzzle$ = this.currentSongIdx$.pipe(
      map((index) => this.songs[index]),
      filter(song => !!song),
      map((song) => song.split(' ')
        .map(word => new Word(word))
        .sort(() => Math.random() - 0.5)),
    );
  }

  ngOnInit() {
    this.messageService.showWelcomeMessage();
    combineLatest([this.answer$, this.currentSongIdx$]).pipe(
      filter(([answer, index]) => answer.join(' ') === this.songs[index]),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.onCorrectWordOrder();
    });
  }

  onWordClick(word: Word) {
    word.use();
    this.answer$.next([...this.answer$.value, word.text]);
  }

  reset(song: Word[]) {
    song.forEach(word => word.reset());
    this.answer$.next([]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private onCorrectWordOrder() {
    const nextSongIdx = this.currentSongIdx$.value + 1;
    if (nextSongIdx >= this.songs.length) {
      this.messageService.showSuccessMessage();
    }
    this.currentSongIdx$.next(nextSongIdx);
    this.answer$.next([]);
  }
}

class Word {

  isUsed = false;

  constructor(public text: string) {
  }

  use() {
    this.isUsed = true;
  }

  reset() {
    this.isUsed = false;
  }
}
