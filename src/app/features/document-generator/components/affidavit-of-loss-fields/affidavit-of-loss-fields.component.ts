import { Component, OnInit } from '@angular/core';
import { BaseDocFields } from '../../models';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
    this.setFormFields();
  }

  ngOnInit(): void {
    this.initForm(
      this.fb.group({
        location: ['', [Validators.required]],
        affiantName: ['', [Validators.required]],
        civilStatus: ['', [Validators.required]],
        address: ['', [Validators.required]],
        missingDoc: ['', [Validators.required]],
        referenceNumber: ['', [Validators.required]],
        approximateDateOfLoss: ['', [Validators.required]],
        circumstances: ['', [Validators.required]],
        validId: ['', [Validators.required]],
        dateSigned: ['', [Validators.required]],
      })
    );
  }

  private setFormFields(): void {
    this.formFields = [
      { label: 'Location or Notarization', field: 'location' },
      { label: "Affiant's Name", field: 'affiantName' },
      { label: 'Civil Status', field: 'civilStatus' },
      { label: 'Address', field: 'address' },
      { label: 'Missing ID/Document', field: 'missingDoc' },
      { label: 'Reference #', field: 'referenceNumber' },
      { label: 'Approximate Date of Loss', field: 'approximateDateOfLoss' },
      { label: 'Circumstances', field: 'circumstances' },
      { label: 'Valid ID', field: 'validId' },
      { label: 'Date Signed', field: 'dateSigned' },
    ];
  }
}
