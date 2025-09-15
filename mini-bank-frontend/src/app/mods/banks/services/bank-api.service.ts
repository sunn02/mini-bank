import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bank } from '../models/bank.model';
import { environment } from '../../../../enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class BankApiService {

  private apiUrl = `${environment.apiUrl}/banks`;

  constructor( private http: HttpClient ) { }


  getBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.apiUrl);
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


