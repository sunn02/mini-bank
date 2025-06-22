import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SHARED_PRIMENG_MODULES } from '../../shared/shared-primeng';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, SidebarComponent, SHARED_PRIMENG_MODULES, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
