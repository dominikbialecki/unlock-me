import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EgyptComponent} from './egypt/egypt.component';
import {DeadlyWavesComponent} from './deadly-waves/deadly-waves.component';
import {ArtifactComponent} from './artifact/artifact.component';
import {ClockComponent} from './clock/clock.component';
import {RelaxComponent} from './relax/relax.component';


export const routes: Routes = [
  {path: 'artifact', component: ArtifactComponent},
  {path: 'clock', component: ClockComponent},
  {path: 'egypt', component: EgyptComponent},
  {path: 'deadly-waves', component: DeadlyWavesComponent},
  {path: 'relax', component: RelaxComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
