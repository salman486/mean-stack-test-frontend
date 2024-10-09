import { Routes } from '@angular/router';
import { LoginErrorComponent } from './login-error/login-error.component';
import { GithubConnectComponent } from './github-connect/github-connect.component';

export const routes: Routes = [
  {
    path: '',
    component: GithubConnectComponent,
  },
  {
    path: 'login-error',
    component: LoginErrorComponent,
  },
];
