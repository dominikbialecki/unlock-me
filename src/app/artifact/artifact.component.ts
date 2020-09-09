import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'um-artifact',
  template: `
    <p>
      artifact works!
    </p>
  `,
  styleUrls: ['./artifact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtifactComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
