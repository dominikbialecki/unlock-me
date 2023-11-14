import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import dayjs from 'dayjs';

export interface Prize {
  id: PrizeId;
  name: string;
  usedDate?: string;
  active: boolean;
}

export enum PrizeId {
  Bite = 'Bite',
  Massage = 'Massage',
  HarryPotter = 'HarryPotter',
  FoodDelivery = 'FoodDelivery',
  Breakfast = 'Breakfast',
  GoneWithTheWind = 'GoneWithTheWind',
  ChooseTvSeries = 'ChooseTvSeries',
  Theatre = 'Theatre',
  Sauna = 'Sauna',
}

export const initialPrizes: ReadonlyArray<Prize> = [
  {id: PrizeId.ChooseTvSeries, name: 'Wybór serialu'},
  {id: PrizeId.Sauna, name: 'Wyjście na sauny'},
  {id: PrizeId.Breakfast, name: 'Przepyszne śniadanie do łóżka'},
  {id: PrizeId.HarryPotter, name: 'Obejrzymy Harrego Pottera'},
  {id: PrizeId.Theatre, name: 'Pójdziemy do teatru na wybrany przez Ciebie spektakl'},
  {id: PrizeId.Bite, name: 'Ugryzienie'},
  {id: PrizeId.GoneWithTheWind, name: 'Obejrzenie "Przeminęło z wiatrem"'},
  {id: PrizeId.FoodDelivery, name: 'Zamówimy jedzenie jakie sobie tylko życzysz'},
  {id: PrizeId.Massage, name: 'Masaż'},
].map((partial) => ({...partial, active: false}));

@Injectable({
  providedIn: 'root'
})
export class PrizeStoreService {

  private readonly prizeKey = 'prizes';
  private prizes$ = new BehaviorSubject<Prize[]>([]);

  constructor() {
    let savedPrizes = localStorage.getItem(this.prizeKey);
    const prizes = this.refreshSavedPrizes(savedPrizes ? JSON.parse(savedPrizes) : undefined);
    this.storePrizes(prizes);
  }

  getPrizes(): Observable<Prize[]> {
    return this.prizes$.pipe(map((prizes) => prizes.filter(prize => prize.active)));
  }

  markAsUsed(prizeId: PrizeId): Observable<void> {
    const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const prizes = this.prizes$.getValue().map(prize => prize.id === prizeId ? {...prize, usedDate: date} : prize);
    this.storePrizes(prizes);
    return of();
  }

  undoMarkAsUsed(prizeId: PrizeId): Observable<void> {
    const prizes = this.prizes$.getValue().map(prize => prize.id === prizeId ? {...prize, usedDate: undefined} : prize);
    this.storePrizes(prizes);
    return of();
  }

  unlockPrize(prizeId: PrizeId): Observable<Prize> {
    const prizes = this.prizes$.getValue();
    const prize = prizes.find(prize => prize.id === prizeId);
    if (prize) {
      prize.active = true;
      this.storePrizes(prizes);
    }
    return of(prize);
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
        return {
          ...initialPrize,
          usedDate: savedPrize?.usedDate,
          active: savedPrize?.active ?? false,
        };
      });
    }
  }
}
