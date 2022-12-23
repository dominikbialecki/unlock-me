import {Injectable} from '@angular/core';
import {MessageService} from '../../message/message-service';
import {PrizeService} from '../../prize/prize.service';
import {Observable} from 'rxjs';
import {PrizeId} from '../../prize/prize-store.service';
import {PuzzleId, PuzzleService} from '../../command-center/puzzle-service';
import {I} from '@angular/cdk/keycodes';

@Injectable({providedIn: 'root'})
export class MemoryMessageService {

  constructor(private messageService: MessageService,
              private prizeService: PrizeService,
              private puzzleService: PuzzleService,
  ) {
  }

  showWelcomeMessage(): Observable<unknown> {
    const message = `
      <p>O tej porze roku Kevin może się z czystym sumieniem objadać pysznymi pierniczkami. Jest tylko jeden problem...</p>
      <p>Wygląda na to, że ktoś kolaborował z Grinchem i dosypał coś do ciasteczek!</p>
      <p>Dowiedź się, kto maczał w tym palce i niedopuść, żeby Kevin się zatruł!</p>
    `;
    return this.messageService.showIfNotLastSeen({
      message,
      actions: [
        {text: 'Mniam, ciastka!'},
      ]
    });
  }

  showSuccessMessage(): void {
    const message = `
      <p>A więc to ten nicpoń sprzymierzył się z Grinchem? W tym roku w rakiecie będzie tylko rózga, Prizon Mike!</p>
      <p>A Ty, agencie, szykuj się na swoją nagrodę.</p>
    `;
    this.messageService.setMessage(message);
    this.messageService.showMessage({
      actions: [
        {text: 'Co to takiego?'},
      ]
    }).subscribe(() => {
      this.puzzleService.marAsCompleted(PuzzleId.Memory);
      this.prizeService.awardAndShowPrize(PrizeId.ChooseTvSeries);
    });
  }
}
