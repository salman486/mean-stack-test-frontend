import { Routes } from '@angular/router';
import { LoginErrorComponent } from './login-error/login-error.component';
import { RepoDetails } from './repo-details/repo-details.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login-error',
    component: LoginErrorComponent,
  },
  {
    path: 'repo-details',
    component: RepoDetails,
  },
];
