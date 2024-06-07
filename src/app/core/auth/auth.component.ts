import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BgWrapperComponent } from '../../shared/components';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, BgWrapperComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
