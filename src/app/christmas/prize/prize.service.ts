import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

export interface Prize {
  id: number;
  name: string;
  used: boolean;
}

export const initialPrizes: ReadonlyArray<Prize> = [
  {id: 1, name: 'Ugryzienie w brzuch', used: false},
  {id: 2, name: 'Ugryzienie w brzuch', used: false},
  {id: 3, name: 'Ugryzienie w brzuch', used: false},
  {id: 4, name: 'Ugryzienie w brzuch', used: false},
  {id: 5, name: 'Ugryzienie w brzuch', used: false},
  {id: 6, name: 'Ugryzienie w brzuch', used: false},
  {id: 7, name: 'Ugryzienie w brzuch', used: false},
  {id: 8, name: 'Ugryzienie w brzuch', used: false},
  {id: 9, name: 'Ugryzienie w brzuch', used: false},
];

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
    return this.prizes$.asObservable();
  }

  markAsUsed(prizeId: number): Observable<void> {
    const prizes = this.prizes$.getValue().map(prize => prize.id === prizeId ? {...prize, used: true} : prize);
    this.storePrizes(prizes);
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
      return initialPrizes.map(initialPrize => ({
        ...initialPrize,
        used: savedPrizes.find(savedPrize => savedPrize.id === initialPrize.id)?.used
      }));
    }
  }
}
