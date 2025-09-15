import { Component, Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { AuthService } from '../../../../services/auth.service';


@Component({
  selector: 'app-header',
  imports: [RouterModule, SHARED_PRIMENG_MODULES],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

    constructor( private authService: AuthService, private router: Router) {}
  

  items: MenuItem[] = [
    {
      label: 'Admin',
      icon: 'pi pi-user',
      items: [
        {
          label: 'Log out',
          icon: 'pi pi-sign-out',
          command: () => this.onLogOut()
        },
        
      ]
    }
  ];


  onLogOut(){
    this.authService.logout();
    this.router.navigate(['']);
  }

}
