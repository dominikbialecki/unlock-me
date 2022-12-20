import {Injectable} from '@angular/core';
import {MessageService} from '../../message/message-service';
import {PrizeService} from '../../prize/prize.service';
import {Observable} from 'rxjs';
import {PrizeId} from '../../prize/prize-store.service';
import {PuzzleId, PuzzleService} from '../../command-center/puzzle-service';

@Injectable({providedIn: 'root'})
export class UnstablePathMessageService {

  constructor(private messageService: MessageService,
              private prizeService: PrizeService,
              private puzzleService: PuzzleService,
  ) {
  }

  showWelcomeMessage(): Observable<unknown> {
    const message = `
      <p>Indiana właśnie spakował do torby antyczną bombkę i śpieszy się na samolot do domu, żeby zdążyć na Święta. Wszystko byłoby pięknie, gdyby ktoś nie dosypał proszku do pieczenia do dawno uśpionego super-wulkanu.</p>
      <p>Doprowadź Indianę na stabilny grunt. Pospiesz się, inaczej ucieknie mu samolot!</p>
    `;
    return this.messageService.showIfNotLastSeen({
      message,
      actions: [
        {text: 'Biegnij, Jones! Biegnij!'},
      ]
    });
  }

  showSuccessMessage(): void {
    const message = `
      <p>Gratulacje! Z pozostałą częścią drogi Jones powinien już sobie poradzić. Do odlotu zostało 0:14:27, więc spokojnie jeszcze zdąży.</p>
      <p>Wygląda na to, że nasz psotnik uciekł jeszcze zanim się w ogóle pojawiliśmy przy wulkanie. Musimy go szukać dalej.</p>
      <p>A tymczasem przyznaliśmy Ci kolejną nagrodę.</p>
    `;
    this.messageService.setMessage(message);
    this.messageService.showMessage({
      actions: [
        {text: 'Następnym razem nam się uda!'},
      ]
    }).subscribe(() => {
      this.puzzleService.marAsCompleted(PuzzleId.UnstablePath);
      this.prizeService.awardAndShowPrize(PrizeId.Sauna);
    });
  }
}
