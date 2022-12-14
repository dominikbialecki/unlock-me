import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

export interface Prize {
  id: number;
  name: string;
  used: boolean;
  active: boolean;
}

export const initialPrizes: ReadonlyArray<Prize> = [
  {name: 'Zamówimy jedzenie jakie sobie tylko życzysz'},
  {name: 'Przepyszne śniadanie do łóżka'},
  {name: 'Obejrzenie "Przeminęło z wiatrem"'},
  {name: 'Ugryzienie w brzuch'},
  {name: 'Ugryzienie w brzuch'},
  {name: 'Ugryzienie w brzuch'},
  {name: 'Przepyszne śniadanie do łóżka'},
  {name: 'Obejrzenie "Przeminęło z wiatrem"'},
  {name: 'Ugryzienie w brzuch'},
].map(({name}, idx) => ({name, used: false, active: false, id: idx}));

@Injectable({
  providedIn: 'root'
})
export class PrizeService {

  private readonly prizeKey = 'prizes';
  private prizes$ = new BehaviorSubject<Prize[]>([]);

  constructor() {
  }

  getPrizes(): Observable<Prize[]> {
    let savedPrizes = localStorage.getItem(this.prizeKey);
    const prizes = this.refreshSavedPrizes(savedPrizes ? JSON.parse(savedPrizes) : undefined);
    this.storePrizes(prizes);
    return this.prizes$.pipe(map((prizes) => prizes.filter(prize => prize.active)));
  }

  markAsUsed(prizeId: number): Observable<void> {
    const prizes = this.prizes$.getValue().map(prize => prize.id === prizeId ? {...prize, used: true} : prize);
    this.storePrizes(prizes);
    return of();
  }

  undoMarkAsUsed(prizeId: number): Observable<void> {
    const prizes = this.prizes$.getValue().map(prize => prize.id === prizeId ? {...prize, used: false} : prize);
    this.storePrizes(prizes);
    return of();
  }

  unlockNextPrize(): Observable<void> {
    const prizes = this.prizes$.getValue();
    const nextPrize = prizes.find(prize => !prize.active);
    if (nextPrize) {
      nextPrize.active = true;
      this.storePrizes(prizes);
    }
    return of();
  }

  private storePrizes(prizes: Prize[]) {
    this.prizes$.next(prizes);
    localStorage.setItem(this.prizeKey, JSON.stringify(prizes));
  }

  private refreshSavedPrizes(savedPrizes?: Prize[]): Prize[] {
    if (!savedPrizes) {
      return [...initialPrizes];
    } else {
      return initialPrizes.map(initialPrize => {
        const savedPrize = savedPrizes.find(savedPrize => savedPrize.id === initialPrize.id);
        return ({
          ...initialPrize,
          used: savedPrize?.used ?? false,
          active: savedPrize?.active ?? false,
        });
      });
    }
  }
}
