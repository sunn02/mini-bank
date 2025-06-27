import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountPostRequest, AccountPutRequest, AccountResponse } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  private apiUrl = 'http://54.173.20.225:8080/api/Account';

  constructor( private http: HttpClient ) { }


  getAccounts(): Observable<AccountResponse[]> {
    return this.http.get<AccountResponse[]>(this.apiUrl + '/all');
  }

  postAccount(newAccount: AccountPostRequest): Observable<AccountPostRequest> {
    return this.http.post<AccountPostRequest>(this.apiUrl, newAccount);
  }

  deleteAccount(account: AccountResponse): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${account.id}`);
  }

  updateAccount(updatedAccount: AccountPutRequest): Observable<AccountPutRequest> {
    return this.http.put<AccountPutRequest>(this.apiUrl, updatedAccount);
  }

}


