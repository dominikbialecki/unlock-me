import {Injectable} from '@angular/core';
import {MessageService} from '../../message/message-service';
import {PrizeService} from '../../prize/prize.service';
import {Observable} from 'rxjs';
import {PrizeId} from '../../prize/prize-store.service';

@Injectable({providedIn: 'root'})
export class MemoryMessageService {

  constructor(private messageService: MessageService,
              private prizeService: PrizeService,
  ) {
  }

  showWelcomeMessage(): Observable<unknown> {
    const message = `
      <p>O tej porze roku Kevin może się z czystym sumieniem objadać pysznymi pierniczkami. Jest tylko jeden problem...</p>
      <p>Wygląda na to, że ktoś kolaborował z Grinchem i podmienił część ciasteczek na diatetyczne! Nie możemy dopuścić, by Kevin się zatruł.</p>
    `;
    this.messageService.setMessage(message);
    return this.messageService.showMessage({
      actions: [
        {text: 'Mniam, ciastka!'},
      ]
    });
  }

  showSuccessMessage(): Observable<unknown> {
    const message = `
      <p>A więc to ten nicpoń sprzymierzył się z Grinchem? W tym roku w rakiecie będzie tylko rózga, Prizon Mike!</p>
      <p>A Ty, agencie, szykuj się na swoją nagrodę.</p>
    `;
    this.messageService.setMessage(message);
    return this.messageService.showMessage({
      actions: [
        {text: 'A nagroda?', callback: () => this.prizeService.awardAndShowPrize(PrizeId.ChooseTvSeries)},
      ]
    });
  }
}
