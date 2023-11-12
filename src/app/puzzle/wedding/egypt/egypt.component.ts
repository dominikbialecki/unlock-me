import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {PuzzleSolvedDirective} from '../../puzzle-solved.directive';
import {EgyptToggleButtonComponent} from './egypt-toggle-button/egypt-toggle-button.component';
import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {CardComponent} from '../../../ui-components/card/card.component';

@Component({
  selector: 'um-egypt',
  template: `
    <um-card class="description" color="dark">
      Co to? Jestem w Egipcie?! Ale to dobrze... Słyszałem, ze to tu ukryta jest słynna statuetka Anamuptatisa. Według przepowiedni ma ona
      moc zniszczyć od środka wszelkie źródła 5G, szczepionki a nawet LGBT. Muszę ją znaleźć wsród piramid...
    </um-card>
    @for (row of (toggles$ | async); track trackByIndex(rowIdx, row); let rowIdx = $index) {
  <div class="row">
      @for (toggle of row; track trackByIndex(colIdx, toggle); let colIdx = $index) {
  <um-egypt-toggle-button
                              [value]="toggle"
                              (click)="onToggleClick(rowIdx, colIdx)"
      ></um-egypt-toggle-button>
}
    </div>
}
    @if (valid$ | async) {
<img class="success" umPuzzleSolved src="/assets/egypt/egypt-success.png" alt="success"/>
}
  `,
  styleUrls: ['./egypt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CardComponent, NgFor, EgyptToggleButtonComponent, NgIf, PuzzleSolvedDirective, AsyncPipe]
})
export class EgyptComponent {

  private static readonly ROW_SIZE = 11;

  private readonly code: number[][] = [
    [1, 2],
    [2, 3],
    [2, 3],
    [2, 3],
    [2, 3],
    [2, 3],
  ];
  private readonly validToggles = this.codeToToggles(this.code);
  readonly toggles$: BehaviorSubject<boolean[][]> = new BehaviorSubject(this.initToggles());
  readonly valid$ = this.toggles$.pipe(map(toggles => this.togglesMatchesCode(toggles)));
  readonly trackByIndex = index => index;

  private togglesMatchesCode(toggles: boolean[][]): boolean {
    return this.validToggles.every((row, rowIdx) => {
      return row.every((col, colIdx) => {
        return toggles[rowIdx][colIdx] === col;
      });
    });
  }

  private codeToToggles(code: number[][]): boolean[][] {
    const toggles = [];
    code.forEach(row => {
      const togglesRow = new Array(EgyptComponent.ROW_SIZE).fill(false);
      row.forEach((index) => {
        togglesRow[index - 1] = true;
      });
      toggles.push(togglesRow);
    });
    return toggles;
  }

  private initToggles(): boolean[][] {
    return new Array(this.code.length)
      .fill(undefined)
      .map(() => new Array(EgyptComponent.ROW_SIZE).fill(false));
  }

  onToggleClick(rowIdx: number, colIdx: number): void {
    const current = this.toggles$.getValue();
    const newValue = current.map(row => [...row]);
    newValue[rowIdx][colIdx] = !current[rowIdx][colIdx];
    this.toggles$.next(newValue);
  }
}
