import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, SHARED_PRIMENG_MODULES],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      routerLink: ['/home']
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      routerLink: ['/home/clients']
    },
    {
      label: 'Cuentas',
      icon: 'pi pi-wallet',
      routerLink: ['/home/accounts']  
    },
        {
      label: 'Bancos',
      icon: 'pi pi-building-columns',
      routerLink: ['/home/banks']
    },
    {
      label: 'Transferencias',
      icon: 'pi pi-send',
      routerLink: ['/home/transactions']
    },
  ];


}
