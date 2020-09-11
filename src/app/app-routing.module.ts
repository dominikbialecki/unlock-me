import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EgyptComponent} from './egypt/egypt.component';
import {DeadlyWavesComponent} from './deadly-waves/deadly-waves.component';
import {ArtifactComponent} from './artifact/artifact.component';
import {ClockComponent} from './clock/clock.component';
import {RelaxComponent} from './relax/relax.component';
import {HomeComponent} from './home/home.component';
import {HackerComponent} from './hacker/hacker.component';
import {WeddingComponent} from './wedding/wedding.component';


export const routes: Routes = [
  {path: 'artifact', component: ArtifactComponent},
  {path: 'clock', component: ClockComponent},
  {path: 'egypt', component: EgyptComponent},
  {path: 'deadly-waves', component: DeadlyWavesComponent},
  {path: 'relax', component: RelaxComponent},
  {path: 'home', component: HomeComponent},
  {path: 'hacker', component: HackerComponent},
  {path: 'wedding', component: WeddingComponent},
  {path: 'clock', component: ClockComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
