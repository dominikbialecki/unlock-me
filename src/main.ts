import {enableProdMode, importProvidersFrom} from '@angular/core';
import {environment} from './environments/environment';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import {AppComponent} from './app/app.component';
import {appRoutes} from './app/app.routes';
import {provideRouter} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideServiceWorker} from '@angular/service-worker';
import {bootstrapApplication} from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy, NgOptimizedImage} from '@angular/common';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(MatDialogModule, NgOptimizedImage),
    provideServiceWorker('ngsw-worker.js', {enabled: environment.production}),
    Location, {provide: LocationStrategy, useClass: HashLocationStrategy},
    provideAnimations(),
    provideRouter(appRoutes)
  ]
})
  .catch(err => console.error(err));


dayjs.extend(customParseFormat);
dayjs.extend(duration);
