import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GithubConnectComponent } from '../github-connect/github-connect.component';
import { UserType } from '../types';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [NgIf, GithubConnectComponent],
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  @Input() user: UserType | undefined | null;
}
