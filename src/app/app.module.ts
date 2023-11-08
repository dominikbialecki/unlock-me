import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EgyptComponent} from './puzzle/wedding/egypt/egypt.component';
import {DeadlyWavesComponent} from './puzzle/wedding/deadly-waves/deadly-waves.component';
import {EgyptToggleButtonComponent} from './puzzle/wedding/egypt/egypt-toggle-button/egypt-toggle-button.component';
import {PuzzleSolvedDirective} from './puzzle/puzzle-solved.directive';
import {ArtifactComponent} from './puzzle/wedding/artifact/artifact.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HomeComponent} from './puzzle/wedding/home/home.component';
import {RelaxComponent} from './puzzle/wedding/relax/relax.component';
import {HackerComponent} from './puzzle/wedding/hacker/hacker.component';
import {WeddingComponent} from './puzzle/wedding/wedding/wedding.component';
import {MatrixComponent} from './puzzle/wedding/hacker/matrix/matrix.component';
import {MissionStartComponent} from './christmas/mission-start/mission-start.component';
import {
  MissionStartConfirmComponent
} from './christmas/mission-start/mission-start-confirm/mission-start-confirm.component';
import {
  MissionStartDeclineComponent
} from './christmas/mission-start/mission-start-decline/mission-start-decline.component';
import {NgOptimizedImage} from '@angular/common';
import {UiComponentsModule} from './ui-components/ui-components.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';

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
    MatrixComponent,
    MissionStartComponent,
    MissionStartConfirmComponent,
    MissionStartDeclineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    NgOptimizedImage,
    UiComponentsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
