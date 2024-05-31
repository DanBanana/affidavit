import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-important-point',
  standalone: true,
  imports: [],
  templateUrl: './important-point.component.html',
  styleUrl: './important-point.component.scss',
})
export class ImportantPointComponent {
  @Input() label?: string;
  constructor() {}
}
