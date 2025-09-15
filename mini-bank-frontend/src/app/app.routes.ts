import { Routes } from '@angular/router';
import { HomeComponent } from './portals/home/home.component';
import { LoginComponent } from './portals/login/login.component';
import { DashboardComponent } from './portals/home/components/dashboard/dashboard.component';
import { CustomersComponent } from './mods/customer/pages/customer-page/customer.component';
import { BanksComponent } from './mods/banks/pages/bank-page/bank.component';
import { AccountsComponent } from './mods/accounts/pages/account-page/account.component';
import { authGuard } from './mods/auth/guards/auth.guard';
import { TransactionsComponent } from './mods/transactions/pages/transactions-page/transactions.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard],
    
    children: [
      {
        path: 'clients',
        component: CustomersComponent
      },
      {
        path: 'accounts',
        component: AccountsComponent
      }, 
      {
        path: 'banks',
        component: BanksComponent
      }, 
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'transactions',
        component: TransactionsComponent
      }
    ]


  },
  { path: '', component:  LoginComponent},
];
