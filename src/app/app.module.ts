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
import {CardComponent} from './ui-components/card/card.component';
import {NextCardComponent} from './ui-components/next-card/next-card.component';
import {NumberFormComponent} from './ui-components/number-form/number-form.component';
import {MatrixComponent} from './puzzle/wedding/hacker/matrix/matrix.component';
import {MissionStartComponent} from './christmas/puzzle/mission-start/mission-start.component';
import {
  MissionStartConfirmComponent
} from './christmas/puzzle/mission-start/mission-start-confirm/mission-start-confirm.component';
import {
  MissionStartDeclineComponent
} from './christmas/puzzle/mission-start/mission-start-decline/mission-start-decline.component';
import {PuzzlePortalComponent} from './christmas/command-center/puzzle-portal/puzzle-portal.component';
import {CommandCenterComponent} from './christmas/command-center/command-center.component';
import {NgOptimizedImage} from '@angular/common';
import { HitTheMoleComponent } from './christmas/puzzle/hit-the-mole/hit-the-mole.component';

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
    MatrixComponent,
    MissionStartComponent,
    MissionStartConfirmComponent,
    MissionStartDeclineComponent,
    CommandCenterComponent,
    PuzzlePortalComponent,
    HitTheMoleComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
        NgOptimizedImage
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
