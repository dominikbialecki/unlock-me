import {Injectable} from '@angular/core';
import {MessageService} from '../../message/message-service';
import {Observable} from 'rxjs';
import {PrizeService} from '../../prize/prize.service';
import {PrizeId} from '../../prize/prize-store.service';
import {PuzzleId, PuzzleService} from '../../command-center/puzzle-service';

@Injectable({'providedIn': 'root'})
export class HitTheMoleMessageService {

  constructor(private messageService: MessageService,
              private prizeService: PrizeService,
              private puzzleService: PuzzleService,
  ) {
  }

  showWelcomeMessage(): Observable<unknown> {
    const message = 'Z naszych informacji wynika, że Grinch nienawidzi sierot. Szczególnie tych z blizną na czole. ' +
      'Wysłał swoje pomioty, żeby zepsuli jednej z nich jej już i tak żałosne święta bez rodziców. ' +
      'Zatrzymaj je, nim stanie się coś niedobrego! Żeby ułatwić Ci zadanie, wysłaliśmy też naszych ludzi do pomocy.';
    this.messageService.setMessage(message);
    return this.messageService.showMessage({
      actions: [
        {text: 'Zajmę się nimi!'},
      ]
    });
  }

  showLoseMessage(): Observable<unknown> {
    const message = 'Nie, nie, nie! Co Ty wyprawiasz?! Chcesz, żeby to biedne dziecko straciło resztki radości z życia?';
    this.messageService.setMessage(message);
    return this.messageService.showMessage({
      actions: [
        {text: 'Tym razem na pewno mi się uda!!!'},
      ]
    });
  }

  showNextLevelMessage(): Observable<unknown> {
    const message = 'Świetna robota! Ale to jeszcze nie koniec. Nadciąga nowa horda pomiotów!';
    this.messageService.setMessage(message);
    return this.messageService.showMessage({
      actions: [
        {text: 'Phi, co to dla mnie'},
      ]
    });
  }

  showWinMessage(): void {
    const message = `
        <span>Gratulacje! Udało Ci się pokrzyżować plany Grincha, choć niestety on sam umknął. Następnym razem dostanie za swoje!</span>
        <br/><br/>
        <span>W nagrodę za zasługi przyznaliśmy Ci kolejny przywilej.</span>
    `;
    this.messageService.setMessage(message);
    this.messageService.showMessage({
      actions: [
        {text: 'Eeeekstra!!! Co to takiego?'},
      ]
    }).subscribe(() => {
        this.puzzleService.marAsCompleted(PuzzleId.HarryPotter);
        this.prizeService.awardAndShowPrize(PrizeId.GoneWithTheWind);
    });
  }
}
