import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'um-relax',
  template: `
    <p>
      relax works!
    </p>
  `,
  styleUrls: ['./relax.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelaxComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
