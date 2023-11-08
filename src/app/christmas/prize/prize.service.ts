import {Injectable} from '@angular/core';
import {PrizeId, PrizeStoreService} from './prize-store.service';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class PrizeService {
  constructor(private prizeStore: PrizeStoreService,
              private router: Router,
              ) {
  }

  awardAndShowPrize(prizeId: PrizeId) {
    this.prizeStore.unlockPrize(prizeId).subscribe(() => {
      this.router.navigate(['/christmas/command-center/prize']);
    });
  }
}
