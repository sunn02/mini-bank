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


  getCostumers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.apiUrl + '/all');
  }


  postCustomer(newCustomer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, newCustomer);
  }

  deleteCustomer(customer: Customer): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${customer.id}`);
  }

  updateCustomer(updatedCustomer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.apiUrl, updatedCustomer);
  }

}


