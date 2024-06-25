import { Component } from '@angular/core';
import {
  BgWrapperComponent,
  ButtonComponent,
  IconComponent,
  ImportantPointComponent,
} from '../../shared/components';
import { LandingFormComponent } from './landing-form/landing-form.component';
import { IconType } from '../../shared/models/enums';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavigationService } from '../../shared/services';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    ButtonComponent,
    BgWrapperComponent,
    ImportantPointComponent,
    LandingFormComponent,
    IconComponent,
    MatExpansionModule,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  get iconTypes(): typeof IconType {
    return IconType;
  }

  constructor(private nav: NavigationService) {}

  navigateToDocumentGenerator(): void {
    this.nav.navigateToDocumentGenerator();
  }

  navigateToSetAppoinment(): void {
    this.nav.navigateToSetAppoinment();
  }
}
