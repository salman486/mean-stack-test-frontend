import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { UserType } from '../types';
import { AuthService } from '../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, NgIf, CardComponent],
  selector: 'app-github-connect',
  templateUrl: './github-connect.component.html',
})
export class GithubConnectComponent {
  public user: UserType | null = null;
  public isLoading: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        this.isLoading = false;
        this.user = null;
      },
    });
  }

  connectToGithub() {
    this.authService.loginWithGithub();
  }

  disconnectAccount() {
    this.authService.disconnectAccount().subscribe({
      next: () => {
        this.user = null;
        this.isLoading = false;
      },
    });
  }
}
