import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'um-clock',
  template: `
    <p>
      clock works!
    </p>
  `,
  styleUrls: ['./clock.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
