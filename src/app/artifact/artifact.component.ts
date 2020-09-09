import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {from, fromEvent, Observable} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {EventTargetLike} from 'rxjs/internal-compatibility';

type BatteryManager = EventTargetLike<unknown> & {
  charging: boolean;
};

@Component({
  selector: 'um-artifact',
  template: `
    <div *ngIf="!charging$">
      <p>To był błąd! To był ogromny błąd!!!</p>
      <p>Jeśli natychmiast nie odłożę artefaktu na miejsce spadnie na mnie okropna klątwa.</p>
    </div>

    <div>
      <div class="artifact-wrapper"
           [class.success]="charging$ | async"
           umPuzzleSolved
           [disabled]="(charging$ | async) === false">
        <img class="artifact"
             alt="artifact"
             src="/assets/egypt/egypt-success.png"/>
      </div>
    </div>
  `,
  styleUrls: ['./artifact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtifactComponent implements OnInit {

  charging$: Observable<boolean>;

  constructor() {
  }

  ngOnInit(): void {
    // @ts-ignore
    const battery$ = from(navigator.getBattery() as Promise<BatteryManager>);
    this.charging$ = battery$.pipe(
      switchMap(battery => fromEvent(battery, 'chargingchange').pipe(
        map(() => battery.charging),
        startWith(battery.charging),
        )
      )
    );
  }

}
