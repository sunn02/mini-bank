import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountPostRequest, AccountPutRequest, AccountResponse } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountApiService {

  private apiUrl = 'http://localhost:3000/accounts';

  constructor( private http: HttpClient ) { }


  getAccounts(): Observable<AccountResponse[]> {
    return this.http.get<AccountResponse[]>(this.apiUrl);
  }

  getAccountbyId(id: number): Observable<AccountPutRequest> {
    return this.http.get<AccountPutRequest>(`${this.apiUrl}/${id}`);
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


