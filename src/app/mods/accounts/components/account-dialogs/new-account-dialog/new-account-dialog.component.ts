import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../../../../shared/shared-primeng';
import { AccountPostRequest } from '../../../models/account.model';
import { Currency } from '../../../../currency/models/currency.model';
import { Customer } from '../../../../customer/models/customer.model';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../../services/app.service';

    @Component({
    selector: 'app-edit-account-dialog',
    imports: [FormsModule, SHARED_PRIMENG_MODULES, CommonModule],
    templateUrl: './new-account-dialog.component.html',
    styleUrl: './new-account-dialog.component.css'
    })
    export class NewAccountDialogComponent implements OnInit {

    model: AccountPostRequest = {
        holder: "",
        number: "",
        type: 0,
        currencyId: 0,
        customerId: 0,
        createSavingAccount: {
        savingType: 0
        },
        createCurrentAccount: {
        operationalLimit: 0,
        monthAverage: 0,
        interest: 0
        }
    };

    currencies: Currency[] = [];
    customers: Customer[] = [];

    savingTypes = [
    { label: 'Normal', value: 1 },
    { label: 'Fixed Term', value: 2 }
    ];

    accountTypes = [
    { label: 'Saving Account', value: 0 },
    { label: 'Current Account', value: 1 }
    ];

    constructor(
        public ref: DynamicDialogRef,
        private appService: AppService,
    ) {}

    ngOnInit() {
        this.loadCurrencies();
        this.loadCustomers();
    }

    loadCurrencies() {
        this.appService.currencyApiService.getCurrencies().subscribe({ 
        next: data => { this.currencies = <Currency[]>data} 
        })
    }

    loadCustomers() {
        this.appService.customerApiService.getCostumers().subscribe({ 
        next: data => { this.customers = <Customer[]>data} 
        })
    }

    save(){
        console.log(this.model);
        this.appService.accountApiService.postAccount(this.model).subscribe({
            next: (response) => this.ref.close(response), 
            error: (err) => console.error('Error:', err)
        })
        }
    }