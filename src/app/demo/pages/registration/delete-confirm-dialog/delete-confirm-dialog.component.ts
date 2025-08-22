import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: false,
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrl: './delete-confirm-dialog.component.scss'
})
export class DeleteConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteConfirmDialogComponent>);
}
