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


  getData() {
    return this.http.get(this.apiUrl + '/all');
  }

  postData(newBank: Bank) {
    return this.http.post(this.apiUrl, newBank)
  }

  deleteData(bank: Bank){
    return this.http.delete(this.apiUrl + `/${bank.id}`);
  }

  updateData(updatedBank: Bank){
    return this.http.put(this.apiUrl, updatedBank)
  }
  




}


