import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'um-deadly-waves',
  template: `
    <p>
      deadly-waves works!
    </p>
  `,
  styleUrls: ['./deadly-waves.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeadlyWavesComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
