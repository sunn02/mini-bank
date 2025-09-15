import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated: boolean = false;  

  isLoggedIn(username: string, password: string): boolean{

    if ( username == 'admin' && password == '1234') {
      this.isAuthenticated = true;
      return true
    } else {
      return false
    }
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  logout(){
    this.isAuthenticated = false;
  }




}
