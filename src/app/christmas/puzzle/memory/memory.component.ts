import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'um-memory',
  template: `
      <div class="memory-puzzle" *ngIf="!isSolved else solved">
          <div class="word" *ngFor="let word of wordPuzzles">
              <div class="letter"
                   umExplosion="🍪"
                   *ngFor="let letter of word.letters"
                   [class.selected]="letter.revealed"
                   [ngClass]="letter.type"
                   (click)="word.revealLetter(letter)">
                  {{letter.text}}
              </div>
          </div>

          <button class="ui-button" (click)="reset()">Reset</button>
      </div>
      <ng-template #solved>
          <um-next-card>
              Gratulacje!
          </um-next-card>
      </ng-template>
  `,
  styleUrls: ['./memory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemoryComponent implements OnInit {

  private readonly password = 'CYTRYNOWY SORBET';
  wordPuzzles: WordPuzzle[] = [];

  ngOnInit() {
    const words = this.password.split(' ');
    this.wordPuzzles = words.map(word => new WordPuzzle(word));
  }

  get isSolved() {
    return this.wordPuzzles.every(word => word.isSolved());
  }

  reset() {
    this.wordPuzzles.forEach(word => word.reset());
  }
}

export class WordPuzzle {
  letters: LetterToggle[];
  private answers: LetterToggle[] = [];

  constructor(private word: string) {
    this.letters = this.generatePuzzleLetters(word).map(letter => new LetterToggle(letter));
  }

  revealLetter(letter: LetterToggle) {
    letter.reveal();
    this.answers.push(letter);
  }

  getAnswer() {
    return this.answers.map(letter => letter.text).join('');
  }

  reset() {
    this.letters.forEach(letter => letter.reset());
  }

  private generatePuzzleLetters(password: string): string[] {
    const passwordLetters = password.split('');
    const puzzleLetters = [...passwordLetters];

    for (let i = 0; i < Math.ceil(passwordLetters.length / 3); i++) {
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
