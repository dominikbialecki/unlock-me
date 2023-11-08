import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MessageDialogComponent, MessageDialogData} from './message-dialog/message-dialog.component';
import {Observable, of} from 'rxjs';

export type MessageDialogConfig = Omit<MessageDialogData, 'message'>;

@Injectable({providedIn: 'root'})
export class MessageService {
  private readonly messageKey = 'messages';
  private message: string;

  constructor(private dialog: MatDialog) {
    this.message = localStorage.getItem(this.messageKey);
  }

  showMessage(config?: MessageDialogConfig): Observable<unknown> {
    const dialog = this.dialog.open(MessageDialogComponent, {data: {message: this.message, ...config}});
    return dialog.afterClosed();
  }

  setMessage(message: string) {
    this.message = message;
    localStorage.setItem(this.messageKey, message);
  }

  showIfNotLastSeen(config: MessageDialogData): Observable<unknown> {
    if (this.message !== config.message) {
      this.setMessage(config.message);
      return this.showMessage(config);
    } else {
      return of(undefined)
    }
  }
}
