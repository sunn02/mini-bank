import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../../../../shared/shared-primeng';
import { AccountPutRequest } from '../../../models/account.model';
import { Customer } from '../../../../customer/models/customer.model';
import { Currency } from '../../../../currency/models/currency.model';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../../services/app.service';

@Component({
    selector: 'app-edit-account-dialog',
    imports: [FormsModule, SHARED_PRIMENG_MODULES, CommonModule],
    templateUrl: './edit-account-dialog.component.html',
    styleUrl: './edit-account-dialog.component.css'
})
    
export class EditAccountDialogComponent implements OnInit {

    accountToUpdate: any;


    model: AccountPutRequest = {
        holder: "",
        number: "",
        balance: 0,
        status: 0,
        currencyId: 0,
        customerId: 0,
        bankId: 0
    };

    currencies: Currency[] = [];
    customers: Customer[] = [];

    statusOptions = [
        { label: 'Activo', value: 0 },
        { label: 'Inactivo', value: 1 }
    ];



    constructor(
        private dialogConfig: DynamicDialogConfig,
        private ref: DynamicDialogRef<EditAccountDialogComponent>,
        private appService: AppService,      
    ) {}

    ngOnInit() {
        const accountToUpdate = this.dialogConfig.data.value;
        console.log(accountToUpdate);
        if (accountToUpdate) {
            this.model = {
            id: accountToUpdate.id,
            holder: accountToUpdate.holder,
            number: accountToUpdate.number,
            balance: accountToUpdate.balance,
            status: accountToUpdate.status === 'Activa' ? 0 : 1, 
            currencyId: accountToUpdate.currency,
            customerId: accountToUpdate.customerId,
            bankId: accountToUpdate.bankId
            };
        }

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

    edit() {
        this.appService.accountApiService.updateAccount(this.model).subscribe({
        next: (response) => this.ref.close(response),
        error: (err) => console.error('Error updating account:', err)
        });
    }

}
