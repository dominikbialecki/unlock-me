import {Injectable} from '@angular/core';
import {fromEvent, Observable, timer} from 'rxjs';
import {buffer, filter, map, throttle} from 'rxjs/operators';
import {VibrationTransmitterService} from '../../services/vibration-transmitter.service';

interface Orientation {
  alpha?: number;
  beta?: number;
  gamma?: number;
}

@Injectable({providedIn: 'root'})
export class TransmitOnRelaxService {

  constructor(private vibrations: VibrationTransmitterService) {
  }

  transmit(code: number[]): Observable<unknown> {
    const timer$ = timer(5000, 5000);
    const orientation$ = fromEvent(window, 'deviceorientation') as Observable<Orientation>;

    return orientation$.pipe(
      buffer(timer$),
      map(orientations => this.isSteady(orientations)),
      filter(Boolean),
      throttle(() => this.vibrations.transmit(code)),
    );
  }

  private isSteady(orientations: Orientation[]): boolean {
    const [min, max] = this.minMax(orientations);
    return [max.alpha - min.alpha, max.beta - min.beta, max.gamma - min.gamma].every(delta => delta < 2);
  }

  private minMax(orientations: Orientation[]): [Orientation, Orientation] {
    return orientations.reduce<[Orientation, Orientation]>(([min, max], curr) => {
      return [
        {
          alpha: Math.min(min.alpha, curr.alpha),
          beta: Math.min(min.alpha, curr.beta),
          gamma: Math.min(min.alpha, curr.gamma),
        },
        {
          alpha: Math.max(min.alpha, curr.alpha),
          beta: Math.max(min.alpha, curr.beta),
          gamma: Math.max(min.alpha, curr.gamma),
        }
      ];
    }, [{alpha: 0, beta: 0, gamma: 0}, {alpha: 0, beta: 0, gamma: 0}]);
  }
}
