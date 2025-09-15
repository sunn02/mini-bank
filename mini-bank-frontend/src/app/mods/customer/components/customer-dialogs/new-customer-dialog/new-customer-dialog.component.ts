import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SHARED_PRIMENG_MODULES } from '../../../../../shared/shared-primeng';
import { Customer } from '../../../models/customer.model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Bank } from '../../../../banks/models/bank.model';
import { CommonModule } from '@angular/common';
import { AppService } from '../../../../../services/app.service';


@Component({
    imports: [FormsModule, SHARED_PRIMENG_MODULES, CommonModule],
    selector: 'app-new-Customer-dialog',
    templateUrl: './new-customer-dialog.component.html',
    styleUrl: './new-customer-dialog.component.css',
})
export class NewCustomerDialogComponent implements OnInit{

    model: Customer = {
        name: "",
        lastname: "",
        documentNumber: "",
        address: "",
        mail: "",
        phone: "",
        customerStatus: 0,
        birth: "",
        accounts: []
    }


    banks: Bank[] = []; 


    constructor (public ref: DynamicDialogRef, private appService: AppService) {};

    save(){
        this.appService.customerApiService.postCustomer(this.model).subscribe({
            next: (response) => this.ref.close(response), 
            error: (err) => console.error('Error:', err)
        })
    }


    getBanks(){
        this.appService.bankApiService.getBanks().subscribe({ 
        next: data => { this.banks = <Bank[]>data} 
        }
    )
    }
    
    ngOnInit() {
        this.getBanks(); 
    }

}
