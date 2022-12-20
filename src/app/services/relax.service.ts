import {BehaviorSubject, fromEvent, Observable, timer} from 'rxjs';
import {buffer, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {Injectable, OnDestroy} from '@angular/core';

interface Orientation {
  alpha?: number;
  beta?: number;
  gamma?: number;
}

@Injectable({providedIn: 'root'})
export class RelaxService {

  relaxed$ = new BehaviorSubject(false);

  constructor() {
    const timer$ = timer(2 * 1000, 2 * 1000);
    const orientation$ = fromEvent(window, 'deviceorientation') as Observable<Orientation>;

    orientation$.pipe(
      buffer(timer$),
      map(orientations => this.isSteady(orientations)),
      distinctUntilChanged()
    ).subscribe(this.relaxed$);
  }

  private isSteady(orientations: Orientation[]): boolean {
    const [min, max] = this.minMax(orientations);
    return [max.alpha - min.alpha, max.beta - min.beta, max.gamma - min.gamma].every(delta => delta < 10);
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
