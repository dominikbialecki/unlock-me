import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EgyptComponent} from './egypt/egypt.component';
import {DeadlyWavesComponent} from './deadly-waves/deadly-waves.component';
import {EgyptToggleButtonComponent} from './egypt/egypt-toggle-button/egypt-toggle-button.component';
import {PuzzleSolvedDirective} from './puzzle-solved.directive';
import {ArtifactComponent} from './artifact/artifact.component';
import {ClockComponent} from './clock/clock.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HomeComponent} from './home/home.component';
import {RelaxComponent} from './relax/relax.component';
import {HackerComponent} from './hacker/hacker.component';
import {WeddingComponent} from './wedding/wedding.component';
import {CardComponent} from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    EgyptComponent,
    DeadlyWavesComponent,
    EgyptToggleButtonComponent,
    PuzzleSolvedDirective,
    ArtifactComponent,
    ClockComponent,
    HomeComponent,
    RelaxComponent,
    HackerComponent,
    WeddingComponent,
    CardComponent
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
