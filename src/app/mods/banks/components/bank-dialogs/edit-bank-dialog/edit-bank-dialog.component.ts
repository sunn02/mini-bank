import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../../../../shared/shared-primeng';
import { Bank } from '../../../models/bank.model';
import { BankApiService } from '../../../services/bank-api.service';
import { AppService } from '../../../../../services/app.service';

@Component({
    selector: 'app-edit-bank-dialog',
    imports: [FormsModule, SHARED_PRIMENG_MODULES],
    templateUrl: './edit-bank-dialog.component.html',
    styleUrl: './edit-bank-dialog.component.css'
})
export class EditBankDialogComponent implements OnInit{

    customerToUpdate: any;
    bankToUpdate: any;

    constructor(private dialogConfig: DynamicDialogConfig, private ref: DynamicDialogRef<EditBankDialogComponent>,private appService: AppService) {
    }


    model: Bank = {
        name: "",
        phone: "",
        mail: "",
        address: ""
    }



    edit(){
        this.appService.bankApiService.updateBank(this.model).subscribe({
            next: (response) => this.ref.close(response), 
            error: (err) => console.error('Error:', err)
        })
    }
    

    ngOnInit() {
        this.bankToUpdate = this.dialogConfig.data.value;
        if (this.bankToUpdate) {
            this.model = { ...this.bankToUpdate}; 
        }
        
    } 

}
