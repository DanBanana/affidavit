import { Component } from '@angular/core';
import {
  BgWrapperComponent,
  ButtonComponent,
  IconComponent,
  ImportantPointComponent,
} from '../../shared/components';
import { LandingFormComponent } from './landing-form/landing-form.component';
import { IconType } from '../../shared/models/enums';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    ButtonComponent,
    BgWrapperComponent,
    ImportantPointComponent,
    LandingFormComponent,
    IconComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  get iconTypes(): typeof IconType {
    return IconType;
  }
}
