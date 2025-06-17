import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SHARED_PRIMENG_MODULES } from '../../shared/shared-primeng';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, SidebarComponent, SHARED_PRIMENG_MODULES],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
