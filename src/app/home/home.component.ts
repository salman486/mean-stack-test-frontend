import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { UserType } from '../types';
import { AuthService } from '../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { RepoService } from '../services/repo.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { RouterLink } from '@angular/router';
import { GithubConnectComponent } from '../github-connect/github-connect.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { UserOrganizationsComponent } from '../user-organizations/user-organizations.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgIf,
    GithubConnectComponent,
    UserCardComponent,
    UserOrganizationsComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public user: UserType | null = null;
  public isLoading: boolean = true;
  public isLoadingCheckbox: { [id: number]: boolean } = {};

  colDefs: ColDef[] = [
    { field: 'id' },
    { field: 'name' },
    { field: 'url', headerName: 'Link', flex: 1 },
    {
      field: 'isIncluded',
      headerName: 'Included',
      cellRenderer: 'agCheckboxCellRenderer',
      rowDrag: false,
      cellRendererParams: (params: any) => ({
        checkbox: params.data.isIncluded,
        disabled: this.isLoadingCheckbox[params.data.id],
      }),
      editable: true,
      onCellValueChanged: (event) => this.onCheckboxChange(event),
    },
  ];

  constructor(
    private authService: AuthService,
    private repoService: RepoService
  ) {}

  async onCheckboxChange(event: any) {
    const updatedData = event.data;
    const { id, isIncluded } = updatedData;

    await this.setIncluded(id, isIncluded);
  }

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

  setIncluded(id: number, isIncluded: boolean) {
    if (this.isLoadingCheckbox[id]) {
      return;
    }

    this.isLoadingCheckbox[id] = true;
    this.repoService.setRepoAsIncluded(id, isIncluded).subscribe({
      next: () => {
        this.isLoadingCheckbox[id] = false;
      },
    });
  }
}
