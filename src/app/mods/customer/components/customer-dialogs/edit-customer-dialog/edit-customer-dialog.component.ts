import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../../../../shared/shared-primeng';
import { Customer } from '../../../models/customer.model';
import { Bank } from '../../../../banks/models/bank.model';
import { BankApiService } from '../../../../banks/services/bank-api.service';
import { CustomerApiService } from '../../../services/customer-api.service';

@Component({
    selector: 'app-edit-customer-dialog',
    imports: [FormsModule, SHARED_PRIMENG_MODULES],
    templateUrl: './edit-customer-dialog.component.html',
    styleUrl: './edit-customer-dialog.component.css'
})
export class EditCustomerDialogComponent implements OnInit{

    customerToUpdate: any;

    constructor(private dialogConfig: DynamicDialogConfig, private ref: DynamicDialogRef<EditCustomerDialogComponent>,private apiService: CustomerApiService,  private bankApi: BankApiService) {
    }


    model: Customer = {
        name: "",
        lastname: "",
        documentNumber: "",
        address: "",
        mail: "",
        phone: "",
        customerStatus: 0,
        birth: "",
        bankId: 0
    }


    banks: Bank[] = []; 

    edit(){
        this.apiService.updateData(this.model).subscribe({
            next: (response) => this.ref.close(response), 
            error: (err) => console.error('Error:', err)
        })
    }
    
    getBanks(){
        this.bankApi.getData().subscribe({ 
        next: data => { this.banks = <Bank[]>data} 
        }
    )
    }



    ngOnInit() {
        this.customerToUpdate = this.dialogConfig.data.value;
        if (this.customerToUpdate) {
            this.model = { ...this.customerToUpdate }; // Hacemos una copia para no modificar directo el objeto original
        }
        
        this.getBanks();
    } 

}
