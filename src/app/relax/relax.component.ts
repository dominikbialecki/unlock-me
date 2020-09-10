import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {TransmitOnRelaxService} from './transmit-on-relax.service';

@Component({
  selector: 'um-relax',
  template: `
    <ng-container *ngIf="invalid$ | async; else valid">
      <div class="sleeping"></div>
      <um-card class="form">
        <input *ngFor="let c of code; index as i"
               type="number"
               min="0"
               max="10"
               (input)="onInput(c, i)"
        >
      </um-card>
    </ng-container>
    <ng-template #valid>
      <um-next-card>
        *zieeeew* która to godzina? Chyba mi się przysnęło.
        Hmmmm odtwórzmy przebieg zdarzeń. Muszę tylko znaleźć zegar.
      </um-next-card>
    </ng-template>
  `,
  styleUrls: ['./relax.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelaxComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<boolean>();
  readonly code = [4, 2, 6, 3, 1, 4];
  private readonly value$ = new BehaviorSubject(this.code.map(() => 0));
  readonly invalid$: Observable<boolean>;

  constructor(private transmit: TransmitOnRelaxService) {
    this.invalid$ = this.value$.pipe(
      map(value => this.code.some((num, idx) => value[idx] !== num))
    );
  }

  ngOnInit() {
    this.transmit.transmit(this.code)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onInput(value: number, index: number) {
    const code = [...this.value$.getValue()];
    code[index] = value;
    this.value$.next(code);
  }
}
