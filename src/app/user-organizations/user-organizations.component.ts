import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserOrganizations, UserType } from '../types';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { RepoService } from '../services/repo.service';

@Component({
  selector: 'app-user-organizations',
  standalone: true,
  imports: [NgIf, AgGridAngular],
  templateUrl: './user-organizations.component.html',
  styleUrl: './user-organizations.component.css',
})
export class UserOrganizationsComponent {
  public isLoadingCheckbox: { [id: number]: boolean } = {};
  @Input() userOrganizations: UserOrganizations[] | undefined;
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

  constructor(private repoService: RepoService) {}

  async onCheckboxChange(event: any) {
    const updatedData = event.data;
    const { id, isIncluded } = updatedData;

    await this.setIncluded(id, isIncluded);
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
