import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../app/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(message: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: message
    });
  }
}
