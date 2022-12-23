import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MemoryMessageService} from './memory-message.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'um-memory',
  template: `
    <div class="memory-puzzle">
      <div class="word" *ngFor="let word of wordPuzzles">
        <div class="letter"
             umExplosion="🍪"
             *ngFor="let letter of word.letters"
             [class.selected]="letter.revealed"
             [ngClass]="letter.type"
             (click)="onLetterClick(letter, word)">
          {{letter.text}}
        </div>
      </div>
    </div>
    <p [class.show]="showRefillText$ | async" class="show-refill-text">
      WIĘCEJ!!!
    </p>
    <button class="refill-button" mat-mini-fab (click)="reset()">
      <mat-icon>cookie</mat-icon>
    </button>
  `,
  styleUrls: ['./memory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemoryComponent implements OnInit {

  showRefillText$ = new BehaviorSubject(false);
  private readonly password = 'PRISON MIKE';
  wordPuzzles: WordPuzzle[] = [];

  constructor(private messageService: MemoryMessageService) {
  }

  ngOnInit() {
    this.messageService.showWelcomeMessage();
    const words = this.password.split(' ');
    this.wordPuzzles = words.map(word => new WordPuzzle(word, 8));
  }

  reset() {
    this.showRefillText$.next(true);
    setTimeout(() => {
      this.wordPuzzles.forEach(word => word.reset());
      this.showRefillText$.next(false);
    }, 2000);
  }

  onLetterClick(letter: LetterToggle, word: WordPuzzle) {
    word.revealLetter(letter);
    const isSolved = this.wordPuzzles.every(word => word.isSolved());
    if (isSolved) {
      this.messageService.showSuccessMessage();
    }
  }
}

export class WordPuzzle {
  letters: LetterToggle[];
  private answers: LetterToggle[] = [];

  constructor(private word: string, puzzleLength: number) {
    this.letters = this.generatePuzzleLetters(word, puzzleLength).map(letter => new LetterToggle(letter));
  }

  revealLetter(letter: LetterToggle) {
    letter.reveal();
    this.answers.push(letter);
  }

  getAnswer() {
    return this.answers.map(letter => letter.text).join('');
  }

  reset() {
    this.answers = [];
    this.letters.forEach(letter => letter.reset());
  }

  private generatePuzzleLetters(password: string, puzzleLength: number): string[] {
    const passwordLetters = password.split('');
    const puzzleLetters = [...passwordLetters];

    for (let i = 0; i < puzzleLength - passwordLetters.length; i++) {
      puzzleLetters.push(randomAlphabetLetter());
    }

    return puzzleLetters.sort(() => Math.random() - 0.5);
  }

  isSolved() {
    return this.getAnswer() === this.word;
  }
}

export class LetterToggle {
  revealed = false;
  type: 'type-1' | 'type-2' | 'type-3';

  constructor(public text: string) {
    this.type = ['type-1', 'type-2', 'type-3'][Math.floor(Math.random() * 3)] as 'type-1' | 'type-2' | 'type-3';
  }

  reveal() {
    this.revealed = true;
  }

  reset() {
    this.revealed = false;
  }
}

function randomAlphabetLetter() {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26));
}
