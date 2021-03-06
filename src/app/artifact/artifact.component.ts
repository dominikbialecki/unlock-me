import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {from, fromEvent, Observable} from 'rxjs';
import {debounceTime, filter, map, startWith, switchMap} from 'rxjs/operators';
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
      <div class="artifact-wrapper" [class.charging]="charging$ | async" [class.charged]="charged$ | async">
        <img class="artifact"
             alt="artifact"
             src="/assets/egypt/egypt-success.png"/>
      </div>
    </div>

    <um-next-card *ngIf="charged$ | async">
      Udało się! Zaraza zostałą doszczętnie zniszczona.
      Pora wrócić do domu i wrócić do normalnego życia. Kiedy tylko wrócę do domu muszę...
    </um-next-card>
  `,
  styleUrls: ['./artifact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtifactComponent implements OnInit {

  private static readonly CHARGING_TIME = 10 * 1000;

  charging$: Observable<boolean>;
  charged$: Observable<boolean>;

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
    this.charged$ = this.charging$.pipe(
      filter(Boolean),
      debounceTime(ArtifactComponent.CHARGING_TIME),
      map(() => true),
      startWith(false),
    );
  }

}
