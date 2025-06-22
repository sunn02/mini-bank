import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../../../../shared/shared-primeng';
import { Account } from '../../../models/account.model';
import { CustomerApiService } from '../../../services/account-api.service';
import { Customer } from '../../../../customer/models/customer.model';
import { Currency } from '../../../../currency/models/currency.model';
import { CurrencyApiService } from '../../../../currency/services/currency-api.service';
import { CommonModule } from '@angular/common';

    @Component({
    selector: 'app-edit-account-dialog',
    imports: [FormsModule, SHARED_PRIMENG_MODULES, CommonModule],
    templateUrl: './edit-account-dialog.component.html',
    styleUrl: './edit-account-dialog.component.css'
    })
    export class EditAccountDialogComponent implements OnInit {

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
        private dialogConfig: DynamicDialogConfig,
        private ref: DynamicDialogRef<EditAccountDialogComponent>,
        private apiService: CustomerApiService,
        private currencyApi: CurrencyApiService,      
        private customerApi: CustomerApiService       
    ) {}

    ngOnInit() {
        const accountToUpdate = this.dialogConfig.data.value;
        if (accountToUpdate) {
        this.model = { ...accountToUpdate };
        }

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

    edit() {
        this.apiService.updateData(this.model).subscribe({
        next: (response) => this.ref.close(response),
        error: (err) => console.error('Error updating account:', err)
        });
    }
    }
