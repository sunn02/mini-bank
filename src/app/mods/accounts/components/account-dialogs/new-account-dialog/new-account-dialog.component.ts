import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../../../../shared/shared-primeng';
import { Account } from '../../../models/account.model';
import { CustomerApiService } from '../../../services/account-api.service';
import { CurrencyApiService } from '../../../../currency/services/currency-api.service';
import { Currency } from '../../../../currency/models/currency.model';
import { Customer } from '../../../../customer/models/customer.model';
import { CommonModule } from '@angular/common';

    @Component({
    selector: 'app-edit-account-dialog',
    imports: [FormsModule, SHARED_PRIMENG_MODULES, CommonModule],
    templateUrl: './new-account-dialog.component.html',
    styleUrl: './new-account-dialog.component.css'
    })
    export class NewAccountDialogComponent implements OnInit {

    model: Account = {
        holder: "",
        number: "",
        type: 0,
        currencyId: 0,
        customerId: 0,
        createSavingAccount: {
        savingType: 0
        },
        createCurrentAccount: {
        operationalLimit: "",
        monthAverage: "",
        interest: ""
        }
    };

    currencies: any[] = [];
    customers: any[] = [];

    savingTypes = [
    { label: 'Normal', value: 0 },
    { label: 'Fixed Term', value: 1 }
    ];

    accountTypes = [
    { label: 'Saving Account', value: 0 },
    { label: 'Current Account', value: 1 }
    ];

    constructor(
        public ref: DynamicDialogRef,
        private apiService: CustomerApiService,
        private currencyApi: CurrencyApiService,      
        private customerApi: CustomerApiService       
    ) {}

    ngOnInit() {
        this.loadCurrencies();
        this.loadCustomers();
    }

    loadCurrencies() {
        this.currencyApi.getData().subscribe({ 
        next: data => { this.currencies = <Currency[]>data} 
        }
        )
    }

    loadCustomers() {
        this.customerApi.getData().subscribe({ 
        next: data => { this.customers = <Customer[]>data} 
        }
        )
    }

    save(){
        this.apiService.postData(this.model).subscribe({
            next: (response) => this.ref.close(response), 
            error: (err) => console.error('Error:', err)
        })
        }
    }