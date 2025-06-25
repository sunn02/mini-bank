import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from '../models/currency.model';


@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {

  private apiUrl = 'http://54.173.20.225:8080/api/Currency';

  constructor( private http: HttpClient ) { }


  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.apiUrl + '/all');
  }




}


