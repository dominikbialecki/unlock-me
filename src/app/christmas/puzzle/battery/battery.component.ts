import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BatteryService} from './battery-service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'um-battery',
  template: `
    {{status$ | async}}
  `,
  styleUrls: ['./battery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe]
})
export class BatteryComponent {

  status$: Observable<'80%' | '60%' | '40%' | '20%'>;

  constructor(private batteryService: BatteryService) {
    this.status$ = this.batteryService.getBatteryLevel().pipe(
      map((level) => {
        if (level > 0.8) {
          return '80%';
        } else if (level > 0.6) {
          return '60%';
        } else if (level > 0.4) {
          return '40%';
        } else if (level > 0.2) {
          return '20%';
        }
      })
    );
  }
}
