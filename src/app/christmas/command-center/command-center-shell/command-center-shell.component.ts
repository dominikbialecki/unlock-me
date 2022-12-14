import {ChangeDetectionStrategy, Component, HostListener} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  standalone: true,
  selector: 'um-command-center-shell',
  template: `
    <div class="toolbar">
      <button mat-icon-button [routerLink]="['prize']">
        <mat-icon>menu</mat-icon>
      </button>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./command-center-shell.component.scss'],
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandCenterShellComponent {
  scrollTop = 0;
  hideNav = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.hideNav = this.scrollTop < event.target.scrollTop;
    this.scrollTop = event.target.scrollTop;
  }
}
