import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';
import {NgFor} from '@angular/common';
import {CardComponent} from '../card/card.component';

@Component({
  selector: 'um-number-form',
  template: `
    <um-card class="form">
      @for (c of code; track c; let i = $index) {
  <input
             type="number"
             min="0"
             max="10"
             (input)="onInput(c, i)"
      >
}
    </um-card>
  `,
  styleUrls: ['./number-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CardComponent, NgFor]
})
export class NumberFormComponent implements OnInit, OnDestroy {

  destroy$ = new Subject();
  @Input() code: number[];
  @Output() valid: EventEmitter<void> = new EventEmitter();

  valid$: Observable<boolean>;
  private readonly value$ = new BehaviorSubject([]);

  ngOnInit(): void {
    this.value$.next(this.code.map(() => 0));
    this.valid$ = this.value$.pipe(
      map(value => this.code.every((num, idx) => value[idx] === num))
    );
    this.valid$
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean)
      )
      .subscribe(() => this.valid.emit());
  }

  onInput(value: number, index: number) {
    const code = [...this.value$.getValue()];
    code[index] = value;
    this.value$.next(code);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
