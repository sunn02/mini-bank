import { Routes } from '@angular/router';
import { HomeComponent } from './portals/home/home.component';
import { LoginComponent } from './portals/login/login.component';
import { DashboardComponent } from './portals/home/components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { CustomersComponent } from './mods/customer/pages/customer-page/customer.component';

// canActivate: [authGuard] agregar
export const routes: Routes = [
  { path: 'home', component: HomeComponent,
    
    children: [
      {
        path: 'clients',
        component: CustomersComponent
      }, 
      {
        path: '',
        component: DashboardComponent
      }
    ]


  },
  { path: '', component:  LoginComponent}
];
