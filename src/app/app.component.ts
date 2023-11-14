import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'um-root',
  styleUrls: ['./app.component.scss'],
  template: `
      <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
}
