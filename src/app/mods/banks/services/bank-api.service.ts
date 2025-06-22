import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BankApiService {

  private apiUrl = 'http://54.173.20.225:8080/api/Bank';

  constructor( private http: HttpClient ) { }


  getData() {
    return this.http.get(this.apiUrl + '/all');
  }




}


