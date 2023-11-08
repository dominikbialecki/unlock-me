import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, from, fromEvent, Observable} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {EventTargetLike} from 'rxjs/internal-compatibility';

type BatteryManager = EventTargetLike<unknown> & {
  charging: boolean;
  level: number;
};

@Injectable({providedIn: 'root'})
export class BatteryService implements OnDestroy {

  isCharging$ = new BehaviorSubject(false);

  constructor() {
    this.getBattery().pipe(
      switchMap(battery => fromEvent(battery, 'chargingchange').pipe(
          map(() => battery.charging),
          startWith(battery.charging),
        )
      )
    ).subscribe(this.isCharging$);
  }

  getBatteryLevel(): Observable<number> {
    return this.getBattery().pipe(
      switchMap((battery) => fromEvent(battery, 'levelchange').pipe(map(() => battery.level)),
      )
    );
  }

  getBattery(): Observable<BatteryManager> {
    return from((navigator as any).getBattery() as Promise<BatteryManager>);
  }

  ngOnDestroy(): void {
    this.isCharging$.complete();
  }
}
