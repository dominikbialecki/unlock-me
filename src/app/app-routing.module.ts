import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MissionStartComponent} from './puzzle/christmas/mission-start/mission-start.component';
import {
  MissionStartConfirmComponent
} from './puzzle/christmas/mission-start/mission-start-confirm/mission-start-confirm.component';
import {
  MissionStartDeclineComponent
} from './puzzle/christmas/mission-start/mission-start-decline/mission-start-decline.component';


export const routes: Routes = [
  {path: 'mission-start', component: MissionStartComponent},
  {path: 'mission-start/confirm', component: MissionStartConfirmComponent},
  {path: 'mission-start/decline', component: MissionStartDeclineComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
