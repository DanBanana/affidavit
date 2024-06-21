import { Component, OnInit } from '@angular/core';
import { BaseDocFields } from '../../models';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-affidavit-of-loss-fields',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule],
  templateUrl: './affidavit-of-loss-fields.component.html',
  styleUrl: './affidavit-of-loss-fields.component.scss',
})
export class AffidavitOfLossFieldsComponent
  extends BaseDocFields
  implements OnInit
{
  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.initForm(
      this.fb.group({
        location: 'Cebu City',
        affiantName: '',
        civilStatus: '',
        address: '',
      })
    );
  }
}
