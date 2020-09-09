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

@NgModule({
  declarations: [
    AppComponent,
    EgyptComponent,
    DeadlyWavesComponent,
    EgyptToggleButtonComponent,
    PuzzleSolvedDirective,
    ArtifactComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
