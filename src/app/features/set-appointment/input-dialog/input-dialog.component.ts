import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-input-dialog',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './input-dialog.component.html',
  styleUrl: './input-dialog.component.scss',
})
export class InputDialogComponent {
  form!: FormGroup;

  private readonly dialogRef = inject(MatDialogRef<InputDialogComponent>);

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  onClick(): void {
    this.dialogRef.close(this.form.getRawValue().name);
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.min(3), Validators.min(30)]],
    });
  }
}
