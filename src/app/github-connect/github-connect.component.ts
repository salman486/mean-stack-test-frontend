import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [CardComponent],
  selector: 'app-github-connect',
  templateUrl: './github-connect.component.html',
})
export class GithubConnectComponent {
  constructor(private authService: AuthService) {}

  connectToGithub() {
    this.authService.loginWithGithub();
  }
}
