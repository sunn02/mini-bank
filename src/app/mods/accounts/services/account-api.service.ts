import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  private apiUrl = 'http://54.173.20.225:8080/api/Account';

  constructor( private http: HttpClient ) { }


  getData() {
    return this.http.get(this.apiUrl + '/all');
  }


  postData(newAccount: Account) {
    return this.http.post(this.apiUrl, newAccount)
  }

  deleteData(account: Account){
    return this.http.delete(this.apiUrl + `/${account.id}`);
  }

  updateData(updatedAccount: Account){
    return this.http.put(this.apiUrl, updatedAccount)
  }

}


