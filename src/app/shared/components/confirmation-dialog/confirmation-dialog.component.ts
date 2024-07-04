import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [MatButtonModule, ButtonComponent],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.scss',
})
export class ConfirmationDialogComponent {
  readonly data = inject<any>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(
    MatDialogRef<ConfirmationDialogComponent>
  );

  onClick(val: boolean): void {
    this.dialogRef.close(val);
  }
}
