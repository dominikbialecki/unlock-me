import {Injectable} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {VibrationTransmitter} from '../../../services/vibration-transmitter';

@Injectable({
  providedIn: 'root'
})
export class RhythmVibrationTransmitterService implements VibrationTransmitter {
  private static readonly VIBRATION_DURATION = 100;

  transmit(rhythm: number[]): Observable<unknown> {
    const code = this.vibrations(rhythm);
    navigator.vibrate(code);
    return this.emitAfterFinished(code);
  }

  private vibrations(rhythm: number[]): number[] {
    const vibrations = [];
    rhythm.forEach(duration => {
      vibrations.push(RhythmVibrationTransmitterService.VIBRATION_DURATION);
      vibrations.push(duration - RhythmVibrationTransmitterService.VIBRATION_DURATION);
    });
    return vibrations;
  }

  private emitAfterFinished(code: number[]): Observable<unknown> {
    const duration = code.reduce((acc, millis) => acc + millis, 0);
    return timer(duration);
  }
}
