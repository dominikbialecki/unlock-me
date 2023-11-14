import {CommandCenterComponent} from './command-center.component';
import {CommandCenterShellComponent} from './command-center-shell/command-center-shell.component';
import {Routes} from '@angular/router';

export default [
  {
    path: '',
    component: CommandCenterShellComponent,
    children: [
      {path: '', pathMatch: 'full', component: CommandCenterComponent},
      {path: 'puzzle', loadChildren: () => import('../puzzle/puzzle.routes').then(m => m.puzzleRoutes)},
      {path: 'prize', loadComponent: () => import('../prize/prize.component').then(m => m.PrizeComponent)},
    ]
  },
] as Routes;
