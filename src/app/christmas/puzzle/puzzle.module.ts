import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PuzzlePortalComponent} from '../command-center/puzzle-portal/puzzle-portal.component';
import {HitTheMoleComponent} from './hit-the-mole/hit-the-mole.component';
import {MemoryComponent} from './memory/memory.component';
import {DrumPuzzleComponent} from './drum-puzzle/drum-puzzle.component';
import {BatteryComponent} from './battery/battery.component';
import {UiComponentsModule} from '../../ui-components/ui-components.module';
import {PuzzleRoutingModule} from './puzzle-routing.module';


@NgModule({
  declarations: [
    PuzzlePortalComponent,
    HitTheMoleComponent,
    MemoryComponent,
    DrumPuzzleComponent,
    BatteryComponent,
  ],
  exports: [
    PuzzlePortalComponent,
  ],
  imports: [
    CommonModule,
    UiComponentsModule,
    PuzzleRoutingModule,
  ]
})
export class PuzzleModule {
}
