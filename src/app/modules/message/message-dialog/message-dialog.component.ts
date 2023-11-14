import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {NoteComponent} from '../../../ui-components/note/note.component';

export interface MessageDialogData {
  message: string;
  actions: { text: string, callback?: () => unknown }[];
}

@Component({
  selector: 'um-message-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    NoteComponent,
  ],
  template: `
      <um-note class="note">
          <mat-dialog-content>
              <div class="dialog">
                  <div class="dialog-text" [innerHTML]="data.message">

                  </div>
                  <div class="dialog-answers">
                      <ul>
                          @for (action of data.actions;track action) {
                              <li (click)="onActionClick(action)">
                                  <span [innerHTML]="action.text"></span>
                              </li>
                          }
                      </ul>
                  </div>
              </div>
          </mat-dialog-content>
      </um-note>

  `,
  styleUrls: ['./message-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: MessageDialogData,
              private dialog: MatDialogRef<unknown>,
  ) {
  }

  onActionClick(action: MessageDialogData['actions'][0]): void {
    this.dialog.close(action.callback?.());
  }
}
