import {Injectable} from '@angular/core';
import {from, fromEvent, Observable} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {EventTargetLike} from 'rxjs/internal-compatibility';

type BatteryManager = EventTargetLike<unknown> & {
  charging: boolean;
  level: number;
};

@Injectable({providedIn: 'root'})
export class BatteryService {

  getBatteryLevel(): Observable<number> {
    return this.getBattery().pipe(
      switchMap((battery) => fromEvent(battery, 'levelchange').pipe(map(() => battery.level)),
      )
    );
  }

  getBattery(): Observable<BatteryManager> {
    return from((navigator as any).getBattery() as Promise<BatteryManager>);
  }

}
