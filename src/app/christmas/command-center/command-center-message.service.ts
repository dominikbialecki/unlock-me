import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {MessageService} from '../message/message-service';
import * as dayjs from 'dayjs';
import {Puzzle} from './puzzle/puzzle';

@Injectable({providedIn: 'root'})
export class CommandCenterMessageService {

  constructor(private messageService: MessageService,
  ) {
  }

  showMessage(puzzles: Puzzle[]): void {
    const completedPuzzles = puzzles.filter(puzzle => puzzle.completed);
    const noCompletedPuzzles = completedPuzzles.length === 0;
    const allPuzzlesCompleted = completedPuzzles.length === puzzles.length;
    const isNewPuzzleActive = dayjs().isAfter(dayjs(puzzles[0].date, 'DD-MM-YYYY'));
    // const previousPuzzleWasBattle = puzzles[1]?.id === PuzzleId.Battle;
    if (noCompletedPuzzles) {
      this.showInitialMessage();
    } else if (allPuzzlesCompleted) {
      this.showWinMessage();
      // } else if (previousPuzzleWasBattle){
      //   if (isNewPuzzleActive) {
      //     this.showPostBattleActiveMessage();
      //   } else {
      //     this.showPostBattleInactiveMessage();
      //   }
    } else if (isNewPuzzleActive) {
      this.showNextGameMessage();
    } else {
      this.showNextGameInactiveMessage();
    }
  }

  showInitialMessage(): Observable<unknown> {
    const message = `
      <p>Witaj w centrum dowodzenia! Cieszę się, że tu dotarłaś. Teraz mogę Cię wtajemniczyć w naszą misję.</p>
      <p>Kiedy Grinch nam uciekł, długo nie mogliśmy go znaleźć. Po około tygodniu jeden z naszych agentów oglądając swój ulubiony film zauważył, że scenariusz się zmienił. Wygląda na to, że Grinch znalazł sposób, żeby przemieszczać się między światami! Teraz zagrożone są nie tylko nasze Święta, ale Święta we wszystkich uniwersach!</p>
      <p>Zespół naszych światowej klasy ekspertów stworzył technologię TvPortal, dzięki której mamy szansę go złapać niezależnie od tego, gdzie się ukrywa. Skorzystaj z portalu, żeby dopaść Grincha. Jeśli zdążył napsocić, musisz to odkręcić.</p>
      <p>Los Świąt wszystkich światów zależy od Ciebie!</p>
    `;
    return this.messageService.showIfNotLastSeen({
      message,
      actions: [
        {text: 'Nikt nie będzie niszczyć Świąt na mojej warcie!'},
      ]
    });
  }

  private showNextGameMessage() {
    const message = `
      <p>Tym razem temu parszywemu Grinchowi udało się uciec do kolejnego świata.</p>
      <p>Ustaliliśmy jego aktualną pozycję. Portal jest już gotowy do skoku. Do dzieła, agencie. Uratuj święta!</p>
    `;
    return this.messageService.showIfNotLastSeen({
      message,
      actions: [
        {text: 'Nikt nie będzie niszczyć Świąt na mojej warcie!'},
      ]
    });
  }

  private showNextGameInactiveMessage() {
    const message = `
      <p>Tym razem temu parszywemu Grinchowi udało się uciec!</p>
      <p>Kalibracja portalu do kolejnego świata nie jest prostym zadaniem i chwilę potrwa. Bądź w gotowości.</p>
    `;
    return this.messageService.showIfNotLastSeen({
      message,
      actions: [
        {text: 'Ok, wrócę później'},
      ]
    });
  }

  private showWinMessage() {
    const message = `
      <p>Gratulacje! Grinch nareszcie został powstrzymany.</p>
      <p>Wszyscy jesteśmy z Ciebie bardzo dumni. Światy nareszcie są stabilne i nic już nie powinno tego zmienić. Zasłużyłaś na dłuugi urlop!</p>
      <p>Co powiesz na wypoczynek w Wiśle?</p>
    `;
    return this.messageService.showIfNotLastSeen({
      message,
      actions: []
    });
  }

  private showPostBattleActiveMessage() {
    const message = `
      <p>JAK DO TEGO MOGŁO DOJŚĆ?!</p>
      <p>Co za niedopatrzenie, co za niedopatrzenie... Kiedy furgonetka dojechała do więzienia, w środku znaleźliśmy jedynie pusty worek! To wielka plama na honorze agencji. Nikt nie wie jak mogło do tego dojść.</p>
      <p>Jako, że Święta trwają w najlepsze, podejrzewamy, że Grinch zamierza dalej psocić. Musisz go powstrzymać!</p>
    `;
    return this.messageService.showIfNotLastSeen({
      message,
      actions: [
        {text: 'Nikt nie będzie niszczyć Świąt na mojej warcie!'},
      ]
    });
  }

  private showPostBattleInactiveMessage() {
    const message = `
      <p>Co za świetna robota! Nie mogę wyjść z dumy. Grinch jedzie już w worku prosto do aresztu.</p>
      <p>Spocznij agencie, to już koniec przygód.</p>
    `;
    return this.messageService.showIfNotLastSeen({
      message,
      actions: [
        {text: 'Zrozumiano. Wesołych Świąt!'},
      ]
    });
  }
}
