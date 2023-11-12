import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const missionStartGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isInstalledApp = matchMedia('(display-mode: standalone)').matches;
  const isLocalhost = document.location.origin.startsWith('http://localhost');

  if (isInstalledApp || isLocalhost) {
    return router.navigate(['/christmas/command-center']);
  } else {
    return true;
  }
};
