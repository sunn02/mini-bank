import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ClientsComponent } from './views/clients/clients.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/home/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

// canActivate: [authGuard] agregar
export const routes: Routes = [
  { path: 'home', component: HomeComponent,
    
    children: [
      {
        path: 'clients',
        component: ClientsComponent
      }, 
      {
        path: '',
        component: DashboardComponent
      }
    ]


  },
  { path: '', component:  LoginComponent}
];
