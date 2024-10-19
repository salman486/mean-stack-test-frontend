import { Component } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { RepoDetailsType, UserType } from '../types';
import { AuthService } from '../services/auth.service';
import { RepoService } from '../services/repo.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'repo-details',
  standalone: true,
  imports: [UserCardComponent, NgIf, RouterLink, AgGridAngular],
  templateUrl: './repo-details.component.html',
})
export class RepoDetails {
  public user: UserType | null = null;
  public isLoading: boolean = true;
  public isLoadingDetails: boolean = true;
  public repoDetails: RepoDetailsType[] | null = null;
  colDefs: ColDef[] = [
    { field: 'username', headerName: 'User' },
    { field: 'commits', headerName: 'Total Commits' },
    { field: 'prs', headerName: 'Total Pull Requests' },
    { field: 'issues', headerName: 'Total Issues' },
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private repoService: RepoService
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe({
      next: (user) => {
        if (user === null) {
          this.router.navigate(['/']);
          return;
        }

        this.user = user;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
        this.isLoading = false;
        this.user = null;

        this.router.navigate(['/']);
      },
    });

    this.getRepoDetails();
  }

  getRepoDetails() {
    this.repoService.getRepoDetails().subscribe({
      next: (data) => {
        this.isLoadingDetails = false;
        this.repoDetails = data;
      },

      error: (error) => {
        console.error('Error fetching details:', error);
        this.isLoadingDetails = false;
      },
    });
  }
}
