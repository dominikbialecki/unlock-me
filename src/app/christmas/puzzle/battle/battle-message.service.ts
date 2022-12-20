import {Injectable} from '@angular/core';
import {MessageService} from '../../message/message-service';
import {PrizeService} from '../../prize/prize.service';
import {Observable} from 'rxjs';
import {PrizeId} from '../../prize/prize-store.service';
import {PuzzleId, PuzzleService} from '../../command-center/puzzle-service';

@Injectable({providedIn: 'root'})
export class BattleMessageService {

  constructor(private messageService: MessageService,
              private prizeService: PrizeService,
              private puzzleService: PuzzleService,
  ) {
  }

  showWelcomeMessage(): Observable<unknown> {
    const message = `
      <p>Tym razem go mamy! Kiedy byliśmy zajęci szukaniem Grincha po światach, ten skubaniec zakradł się do wioski Mikołaja płatać mu figle.</p>
      <p>Zdążył już zarazić Rudolfa katarem i zrobić dziurę w worku Mikołaja. Wygląda na to, że kompletnie się nas nie spodziewa.</p>
      <p>Lepszej szansy nie będzie. Pokaż Grinchowi gdzie jego miejsce!</p>
    `;
    return this.messageService.showIfNotLastSeen({
      message,
      actions: [
        {text: 'ZA NARNIE! ZA ASLANA!!!'},
      ]
    });
  }

  showWinMessage() {
    const message = `
      <p>Wspałania robota! Grinch leży powalony na deski.</p>
      <p>Pakujemy go do wora i leci prosto do paki. Gratulacje, agencie. Nie wiem co byśmy bez Ciebie zrobili.</p>
      <p>Misja zakończyła się sukcesem - Święta są uratowane. Wracaj do rodzicy, ciesz się tym czasem i ostateczną nagrodą.</p>
      <p>Wesołych Świąt!</p>
    `;
    this.messageService.setMessage(message);
    this.messageService.showMessage({
      actions: [
        {text: 'Służba była dla mnie przyjemnością. Bywaj!'},
      ]
    }).subscribe(() => {
      this.puzzleService.marAsCompleted(PuzzleId.Battle);
      this.prizeService.awardAndShowPrize(PrizeId.Bite);
    });
  }
}
