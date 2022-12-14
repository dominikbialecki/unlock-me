import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'um-note',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pin"></div>
    <ng-content></ng-content>
  `,
  styleUrls: ['./note.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteComponent {

}
