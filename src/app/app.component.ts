import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {PuzzleSchedulerService} from './puzzle-scheduler.service';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {routes} from './app-routing.module';
import {puzzles} from './puzzles';

@Component({
  selector: 'um-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  constructor(private scheduler: PuzzleSchedulerService,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.scheduler.register(...puzzles);
    this.scheduler.currentPuzzle$
      .pipe(takeUntil(this.destroy$))
      .subscribe(component => {
        const path = routes.find(r => r.component === component).path;
        this.router.navigate([path]);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
