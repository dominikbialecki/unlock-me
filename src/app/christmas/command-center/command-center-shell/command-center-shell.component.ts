import {ChangeDetectionStrategy, Component, HostListener} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {map} from 'rxjs/operators';
import {CommonModule} from '@angular/common';
import {MessageService} from '../../message/message-service';

@Component({
  standalone: true,
  selector: 'um-command-center-shell',
  template: `
      <div class="toolbar" [class.hidden]="hideNav">
          <button *ngIf="isRoot$ | async"
                  class="toolbar-button"
                  mat-mini-fab
                  [routerLink]="['prize']"
          >
              <mat-icon>checklist</mat-icon>
          </button>

          <button *ngIf="(isPrize$ | async)"
                  class="toolbar-button"
                  mat-mini-fab
                  [routerLink]="['.']"
          >
              <mat-icon>tv</mat-icon>
          </button>

          <div class="spacer"></div>

          <button *ngIf="!(isPrize$ | async)"
                  class="toolbar-button"
                  mat-mini-fab
                  (click)="showMessage()"
          >
              <mat-icon>chat</mat-icon>
          </button>
      </div>
      <router-outlet></router-outlet>
  `,
  styleUrls: ['./command-center-shell.component.scss'],
  imports: [
    CommonModule,
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
  // yeah, I know it's ugly
  isRoot$ = this.router.events.pipe(map(() => this.router.url === '/christmas/command-center'));
  isPrize$ = this.router.events.pipe(map(() => this.router.url === '/christmas/command-center/prize'));

  constructor(private router: Router,
              private messageService: MessageService,
  ) {
  }

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    this.hideNav = this.scrollTop < event.target.scrollTop;
    this.scrollTop = event.target.scrollTop;
  }

  showMessage() {
    this.messageService.showMessage();
  }
}
