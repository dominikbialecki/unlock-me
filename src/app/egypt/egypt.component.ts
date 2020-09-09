import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'um-egypt',
  template: `
    <div class="description">
      Odpowiedzi szukaj w egipcie
    </div>
    <div class="row" *ngFor="let row of (toggles$ | async); index as rowIdx; trackBy: trackByIndex">
      <um-egypt-toggle-button *ngFor="let toggle of row; index as colIdx; trackBy: trackByIndex"
                              [value]="toggle"
                              (click)="onToggleClick(rowIdx, colIdx)"
      ></um-egypt-toggle-button>
    </div>
    <img *ngIf="valid$ | async" class="success" umPuzzleSolved src="/assets/egypt/egypt-success.png"/>
  `,
  styleUrls: ['./egypt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
