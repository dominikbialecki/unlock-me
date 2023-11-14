import {Injectable} from '@angular/core';
import {MessageService} from '../../message/message-service';
import {PrizeService} from '../../../modules/prize/prize.service';
import {Observable} from 'rxjs';
import {PrizeId} from '../../../modules/prize/prize-store.service';
import {PuzzleService} from '../../command-center/puzzle/puzzle-service';
import {PuzzleId} from '../../command-center/puzzle/puzzle-id';

@Injectable({providedIn: 'root'})
export class SongAnagramMessageService {

  constructor(private messageService: MessageService,
              private prizeService: PrizeService,
              private puzzleService: PuzzleService,
  ) {
  }

  showWelcomeMessage(): Observable<unknown> {
    const message = `
      <p>Według starożytnej tradycji wykonawca najlepszego przedstawienia świątecznego zostaje zaproszony na Olimp, by pokazać je samym bogom. To jedyna okazja, by Hercules spędził czas z rodzicami.</p>
      <p>Wszystko szło doskonale, układ taneczny był już doszlifowany... do momentu aż ktoś pomieszał kompletnie tekst! Podejrzewamy, że Grinch namówił na ten paskudny gest Hadesa.</p>
      <p>Pomóż Herculesowi przygotować występ wskazując odpowiednią kolejność dzbanów, by mógł zobaczyć rodziców ten jeden kolejny raz.</p>
    `;
    return this.messageService.showIfNotLastSeen({
      message,
      actions: [
        {text: 'i raz i dwa i trzy i cztery i'},
      ]
    });
  }

  showSuccessMessage(): void {
    const message = `
      <p>Woooow co to było za szoł! Z tak dopracowanym układam Hercules bez problemu dostał pierwsze miejsce.</p>
      <p>Próbowaliśmy złapać Grincha gdy rzucał pomidorami z widowni, ale uciekł nam w ostatniej chwili. Oby to był ostatni raz!</p>
      <p>A tymczasem przyznaliśmy Ci kolejną nagrodę.</p>
    `;
    this.messageService.setMessage(message);
    this.messageService.showMessage({
      actions: [
        {text: 'Następnym razem Cię dopadnę, Grinch!'},
      ]
    }).subscribe(() => {
      this.puzzleService.marAsCompleted(PuzzleId.Songs);
      this.prizeService.awardAndShowPrize(PrizeId.Theatre);
    });
  }
}
