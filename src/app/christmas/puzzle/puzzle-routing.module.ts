import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HitTheMoleComponent} from './hit-the-mole/hit-the-mole.component';
import {MemoryComponent} from './memory/memory.component';
import {DrumPuzzleComponent} from './drum-puzzle/drum-puzzle.component';

export const routes: Routes = [
  {path: 'hit-the-mole', component: HitTheMoleComponent},
  {path: 'memory', component: MemoryComponent},
  {path: 'drum', component: DrumPuzzleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuzzleRoutingModule {
}
