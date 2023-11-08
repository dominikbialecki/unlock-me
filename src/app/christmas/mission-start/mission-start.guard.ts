import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class MissionStartGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): boolean | Promise<boolean> {
    const isInstalledApp = matchMedia('(display-mode: standalone)').matches;
    if (isInstalledApp) {
      return this.router.navigate(['/christmas/command-center']);
    } else {
      return true;
    }
  }
}
