import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EgyptComponent} from './egypt/egypt.component';
import {DeadlyWavesComponent} from './deadly-waves/deadly-waves.component';


export const routes: Routes = [
  {path: 'egypt', component: EgyptComponent},
  {path: 'deadly-waves', component: DeadlyWavesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
