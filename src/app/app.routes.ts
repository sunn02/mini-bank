import { Routes } from '@angular/router';
import { HomeComponent } from './portals/home/home.component';
import { ClientsComponent } from './views/clients/clients.component';
import { LoginComponent } from './portals/login/login.component';
import { DashboardComponent } from './portals/home/components/dashboard/dashboard.component';
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
