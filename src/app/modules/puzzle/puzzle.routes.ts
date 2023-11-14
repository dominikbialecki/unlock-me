import {Routes} from '@angular/router';
import {HitTheMoleComponent} from './hit-the-mole/hit-the-mole.component';
import {MemoryComponent} from './memory/memory.component';
import {DrumPuzzleComponent} from './drum-puzzle/drum-puzzle.component';
import {UnstablePathComponent} from './unstable-path/unstable-path.component';
import {SongAnagramComponent} from './song-anagram/song-anagram.component';
import {BattleComponent} from './battle/battle.component';

export const puzzleRoutes: Routes = [
  {path: 'hit-the-mole', component: HitTheMoleComponent},
  {path: 'memory', component: MemoryComponent},
  {path: 'drum', component: DrumPuzzleComponent},
  {path: 'unstable-path', component: UnstablePathComponent},
  {path: 'songs', component: SongAnagramComponent},
  {path: 'battle', component: BattleComponent},
];
