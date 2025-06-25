import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from '../models/bank.model';


@Injectable({
  providedIn: 'root'
})
export class BankApiService {

  private apiUrl = 'http://54.173.20.225:8080/api/Bank';

  constructor( private http: HttpClient ) { }


  getBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.apiUrl + '/all');
  }

  postBank(newBank: Bank): Observable<Bank> {
    return this.http.post<Bank>(this.apiUrl, newBank);
  }

  deleteBank(bank: Bank): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bank.id}`);
  }

  updateBank(updatedBank: Bank): Observable<Bank> {
    return this.http.put<Bank>(this.apiUrl, updatedBank);
  }

  




}


