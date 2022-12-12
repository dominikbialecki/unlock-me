import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MissionStartComponent} from './christmas/puzzle/mission-start/mission-start.component';
import {
  MissionStartConfirmComponent
} from './christmas/puzzle/mission-start/mission-start-confirm/mission-start-confirm.component';
import {
  MissionStartDeclineComponent
} from './christmas/puzzle/mission-start/mission-start-decline/mission-start-decline.component';
import {MissionStartGuard} from './christmas/puzzle/mission-start/mission-start.guard';
import {CommandCenterComponent} from './christmas/command-center/command-center.component';
import {HitTheMoleComponent} from './christmas/puzzle/hit-the-mole/hit-the-mole.component';


export const routes: Routes = [
  {path: '', redirectTo: 'christmas', pathMatch: 'full'},
  {
    path: 'christmas', children: [
      {path: '', redirectTo: 'mission-start', pathMatch: 'full'},
      {path: 'mission-start', component: MissionStartComponent, canActivate: [MissionStartGuard]},
      {path: 'mission-start/confirm', component: MissionStartConfirmComponent},
      {path: 'mission-start/decline', component: MissionStartDeclineComponent},
      {path: 'command-center', component: CommandCenterComponent},
      {
        path: 'puzzle', children: [
          {path: 'hit-the-mole', component: HitTheMoleComponent},
        ]
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
