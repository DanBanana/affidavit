import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DotType, IconType } from '../../../shared/models/enums';
import { IDocType } from '../../../shared/models/interfaces';
import {
  ButtonComponent,
  IconComponent,
  LogoComponent,
} from '../../../shared/components';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NavigationService } from '../../../shared/services';

@Component({
  selector: 'app-landing-form',
  standalone: true,
  imports: [
    LogoComponent,
    ButtonComponent,
    MatSelectModule,
    MatFormFieldModule,
    IconComponent,
  ],
  templateUrl: './landing-form.component.html',
  styleUrl: './landing-form.component.scss',
})
export class LandingFormComponent implements OnInit {
  form!: FormGroup;
  docTypes: IDocType[] = [
    { label: 'Type 1', val: DotType.TYPE_1 },
    { label: 'Type 2', val: DotType.TYPE_2 },
    { label: 'Type 3', val: DotType.TYPE_3 },
    { label: 'Type 4', val: DotType.TYPE_4 },
  ];
  locations: any[] = [
    { label: 'CBP, Cebu City', val: 1 },
    { label: 'Banilad, Cebu City', val: 2 },
    { label: 'Tipolo, Mandaue City', val: 3 },
    { label: 'Pardo, Talisay City', val: 4 },
  ];

  get iconTypes(): typeof IconType {
    return IconType;
  }

  constructor(private fb: FormBuilder, private nav: NavigationService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      docType: '',
      nearestLoc: '',
    });
  }

  navigateToDocumentGenerator(): void {
    this.nav.navigateToDocumentGenerator();
  }
}
