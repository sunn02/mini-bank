import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';
import { environment } from '../../../../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  private apiUrl = `${environment.apiUrl}/customers`;

  constructor( private http: HttpClient ) { }


  getCostumers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.apiUrl);
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


