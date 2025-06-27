import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';

@Component({
  selector: 'app-header',
  imports: [RouterModule, SHARED_PRIMENG_MODULES],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  items: MenuItem[] = [
    {
      label: 'Admin',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Log out',
          icon: 'pi pi-sign-out',
          routerLink: ['']
        },
        
      ]
    }
  ];

}
