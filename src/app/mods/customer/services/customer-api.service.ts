import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  private apiUrl = 'http://54.173.20.225:8080/api/Customer';

  constructor( private http: HttpClient ) { }


  getData() {
    return this.http.get(this.apiUrl + '/all');
  }


  postData(newCustomer: Customer) {
    return this.http.post(this.apiUrl, newCustomer)
  }

}


