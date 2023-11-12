import {Routes} from '@angular/router';
import {MissionStartComponent} from './christmas/mission-start/mission-start.component';
import {MissionStartConfirmComponent} from './christmas/mission-start/mission-start-confirm/mission-start-confirm.component';
import {MissionStartDeclineComponent} from './christmas/mission-start/mission-start-decline/mission-start-decline.component';
import {missionStartGuard} from './christmas/mission-start/mission-start.guard';

export const appRoutes: Routes = [
  {path: '', redirectTo: 'christmas', pathMatch: 'full'},
  {
    path: 'christmas', children: [
      {path: '', redirectTo: 'mission-start', pathMatch: 'full'},
      {path: 'mission-start', component: MissionStartComponent, canActivate: [missionStartGuard]},
      {path: 'mission-start/confirm', component: MissionStartConfirmComponent},
      {path: 'mission-start/decline', component: MissionStartDeclineComponent},
      {path: 'command-center', loadChildren: () => import('./christmas/command-center/command-center.routes')},
    ]
  },
];
