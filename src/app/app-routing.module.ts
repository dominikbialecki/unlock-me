import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EgyptComponent} from './puzzle/egypt/egypt.component';
import {DeadlyWavesComponent} from './puzzle/deadly-waves/deadly-waves.component';
import {ArtifactComponent} from './puzzle/artifact/artifact.component';
import {RelaxComponent} from './puzzle/relax/relax.component';
import {HomeComponent} from './puzzle/home/home.component';
import {HackerComponent} from './puzzle/hacker/hacker.component';
import {WeddingComponent} from './puzzle/wedding/wedding.component';


export const routes: Routes = [
  {path: 'artifact', component: ArtifactComponent},
  {path: 'egypt', component: EgyptComponent},
  {path: 'deadly-waves', component: DeadlyWavesComponent},
  {path: 'relax', component: RelaxComponent},
  {path: 'home', component: HomeComponent},
  {path: 'hacker', component: HackerComponent},
  {path: 'wedding', component: WeddingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
