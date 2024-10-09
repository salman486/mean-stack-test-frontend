import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login-error',
  templateUrl: './login-error.component.html',
})
export class LoginErrorComponent {
  constructor(private router: Router) {}

  onGoToHome() {
    this.router.navigate(['/']); // Redirects user back to login page
  }
}
