import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SHARED_PRIMENG_MODULES } from '../../shared/shared-primeng';

@Component({
  selector: 'app-login',
  imports: [FormsModule, SHARED_PRIMENG_MODULES],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor( private authService: AuthService, private router: Router) {}

  onSubmit(){
    console.log(this.username);

    if (this.authService.isLoggedIn(this.username, this.password)) {
      this.router.navigate(['home']);
    } else {
      this.error = 'Credenciales inválidas';
    }
  } 

}
