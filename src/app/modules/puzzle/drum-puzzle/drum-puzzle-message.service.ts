import {Injectable} from '@angular/core';
import {MessageService} from '../../message/message-service';
import {PrizeService} from '../../../modules/prize/prize.service';
import {Observable} from 'rxjs';
import {PrizeId} from '../../../modules/prize/prize-store.service';
import {PuzzleService} from '../../command-center/puzzle/puzzle-service';
import {PuzzleId} from '../../command-center/puzzle/puzzle-id';

@Injectable({providedIn: 'root'})
export class DrumPuzzleMessageService {

  constructor(private messageService: MessageService,
              private prizeService: PrizeService,
              private puzzleService: PuzzleService,
  ) {
  }

  showWelcomeMessage(): Observable<unknown> {
    const message = `
      <p>Tym razem Grinch zawitał na Lwią Skałę. Mufasa jak co roku miał zabrać syna by upolować świąteczną antylopę, ale ktoś mu dosypał proszków nasennych i za nic nie da się go dobudzić.</p>
      <p>W dodatku, gdy Mufasa śpi naprawdę głęboko, bardzo dziwnie chrapie.</p>
      <p>Pomóż Simbie obudzić rodziców. Kto wie ile wspólnych Świąt im zostało...</p>
    `;
    return this.messageService.showIfNotLastSeen({
      message,
      actions: [
        {text: 'STARY! WSTAWAJ!!!'},
      ]
    });
  }

  showSuccessMessage(): void {
    const message = `
      <p>Świetna robota! Co za wyczucie rytmu!</p>
      <p>Grinch słysząc twoje zagrzewające do boju bembnienie uciekł gdzie pieprz rośnie.</p>
    `;
    this.messageService.setMessage(message);
    this.messageService.showMessage({
      actions: [
        {text: 'A nagroda?'},
      ]
    }).subscribe(() => {
      this.puzzleService.marAsCompleted(PuzzleId.Drum);
      this.prizeService.awardAndShowPrize(PrizeId.Breakfast);
    });
  }
}
