import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransferResponse } from '../models/transaction.model';
import { environment } from '../../../../enviroments/environment';

@Injectable({
    providedIn: 'root'
    })
    export class TransferApiService {
    private baseUrl = `${environment.apiUrl}/transfers`; 

    constructor(private http: HttpClient) { }

    getTransfers(): Observable<TransferResponse[]> {
        return this.http.get<TransferResponse[]>(this.baseUrl);
    }

    getTransferById(id: number): Observable<TransferResponse> {
        return this.http.get<TransferResponse>(`${this.baseUrl}/${id}`);
    }

    deleteTransfer(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
