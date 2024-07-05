import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../shared/models/interfaces';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../../shared/components';
import { DatabaseService } from '../../../shared/services';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    ButtonComponent,
  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent implements OnInit {
  form!: FormGroup;

  @Input() lawyer!: User;
  @Input() guestName!: string;
  @Input() bookingId!: string;
  constructor(private fb: FormBuilder, private db: DatabaseService) {}

  ngOnInit(): void {
    this.initForm();
  }

  async onSubmit(): Promise<void> {
    try {
      this.db.createRating(
        {
          ...this.form.getRawValue(),
          lawyer: this.lawyer.id,
          guestName: this.guestName,
        },
        this.bookingId
      );
    } catch (e) {
      console.error(e);
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      stars: [5, Validators.required],
      comment: [
        '',
        [Validators.required, Validators.min(5), Validators.max(100)],
      ],
    });
  }
}
