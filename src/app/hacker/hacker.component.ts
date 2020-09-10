import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'um-hacker',
  template: `
    <p>
      hacker works!
    </p>
  `,
  styleUrls: ['./hacker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HackerComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
