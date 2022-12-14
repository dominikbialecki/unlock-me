import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  standalone: true,
  selector: 'um-command-center-shell',
  template: `
    <button [routerLink]="['prize']">SHOW PRIZES</button>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./command-center-shell.component.scss'],
  imports: [
    RouterOutlet,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandCenterShellComponent {

}
