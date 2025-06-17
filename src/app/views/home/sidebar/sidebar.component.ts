import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SHARED_PRIMENG_MODULES } from '../../../shared/shared-primeng';
import { MenuItem } from 'primeng/api';

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
      url: '/cuentas'  // usa href si es externo o no manejado por Angular Router
    },
    {
      label: 'Transferencias',
      icon: 'pi pi-send',
      url: '/transferencias'
    }
  ];

}
