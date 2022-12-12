import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EgyptComponent} from './puzzle/egypt/egypt.component';
import {DeadlyWavesComponent} from './puzzle/deadly-waves/deadly-waves.component';
import {EgyptToggleButtonComponent} from './puzzle/egypt/egypt-toggle-button/egypt-toggle-button.component';
import {PuzzleSolvedDirective} from './puzzle/puzzle-solved.directive';
import {ArtifactComponent} from './puzzle/artifact/artifact.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HomeComponent} from './puzzle/home/home.component';
import {RelaxComponent} from './puzzle/relax/relax.component';
import {HackerComponent} from './puzzle/hacker/hacker.component';
import {WeddingComponent} from './puzzle/wedding/wedding.component';
import {CardComponent} from './ui-components/card/card.component';
import {NextCardComponent} from './ui-components/next-card/next-card.component';
import {NumberFormComponent} from './ui-components/number-form/number-form.component';
import {MatrixComponent} from './puzzle/hacker/matrix/matrix.component';

@NgModule({
  declarations: [
    AppComponent,
    EgyptComponent,
    DeadlyWavesComponent,
    EgyptToggleButtonComponent,
    PuzzleSolvedDirective,
    ArtifactComponent,
    HomeComponent,
    RelaxComponent,
    HackerComponent,
    WeddingComponent,
    CardComponent,
    NextCardComponent,
    NumberFormComponent,
    MatrixComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
