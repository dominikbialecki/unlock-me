import {Observable} from 'rxjs';

export abstract class VibrationTransmitter {
  abstract transmit(pattern: number[]): Observable<unknown>;
}
