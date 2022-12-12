import {Injectable} from '@angular/core';
import {Observable, timer} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VibrationTransmitterService {

  private static readonly VIBRATION_DURATION = 100;
  private static readonly VIBRATION_PAUSE_DURATION = 50;
  private static readonly NUMBER_PAUSE_DURATION = 300;

  transmit(pattern: number[]): Observable<unknown> {
    const code = this.vibrations(pattern);
    navigator.vibrate(code);
    return this.emitAfterFinished(code);
  }

  private vibrations(pattern: number[]): number[] {
    const vibrations = [];
    pattern.forEach(num => {
      for (let i = 1; i <= num; i++) {
        vibrations.push(VibrationTransmitterService.VIBRATION_DURATION);
        vibrations.push(i === num ? VibrationTransmitterService.NUMBER_PAUSE_DURATION : VibrationTransmitterService.VIBRATION_PAUSE_DURATION);
      }
    });
    return vibrations;
  }

  private emitAfterFinished(code: number[]): Observable<unknown> {
    const duration = code.reduce((acc, millis) => acc + millis, 0);
    return timer(duration);
  }
}
