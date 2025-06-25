import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  private apiUrl = 'http://54.173.20.225:8080/api/Account';

  constructor( private http: HttpClient ) { }


  getAccounts(): Observable<Account> {
    return this.http.get<Account>(this.apiUrl + '/all');
  }

  postAccount(newAccount: Account): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, newAccount);
  }

  deleteAccount(account: Account): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${account.id}`);
  }

  updateAccount(updatedAccount: Account): Observable<Account> {
    return this.http.put<Account>(this.apiUrl, updatedAccount);
  }

}


