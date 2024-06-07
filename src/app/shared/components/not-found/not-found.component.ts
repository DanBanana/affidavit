import { Component } from '@angular/core';
import { BgWrapperComponent } from '../bg-wrapper/bg-wrapper.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [BgWrapperComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
