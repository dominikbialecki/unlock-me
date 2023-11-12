import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'um-wedding',
  template: `
    <p>
      wedding works!
    </p>
  `,
  styleUrls: ['./wedding.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class WeddingComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
