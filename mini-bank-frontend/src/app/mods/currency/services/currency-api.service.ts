import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from '../models/currency.model';
import { environment } from '../../../../enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {

  private apiUrl = `${environment.apiUrl}/currencies`;

  constructor( private http: HttpClient ) { }


  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiUrl);
  }




}


