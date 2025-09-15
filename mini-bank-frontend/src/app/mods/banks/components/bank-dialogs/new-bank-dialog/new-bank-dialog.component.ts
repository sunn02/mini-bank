import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SHARED_PRIMENG_MODULES } from '../../../../../shared/shared-primeng';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Bank } from '../../../models/bank.model';
import { CommonModule } from '@angular/common';
import { BankApiService } from '../../../services/bank-api.service';
import { AppService } from '../../../../../services/app.service';


@Component({
    imports: [FormsModule, SHARED_PRIMENG_MODULES, CommonModule],
    selector: 'app-new-Customer-dialog',
    templateUrl: './new-bank-dialog.component.html',
    styleUrl: './new-bank-dialog.component.css',
})
export class NewBankDialogComponent{

    model: Bank = {
        name: "",
        phone: "",
        mail: "",
        address: ""
    }


    constructor (public ref: DynamicDialogRef,private appService: AppService) {};

    save(){
        this.appService.bankApiService.postBank(this.model).subscribe({
            next: (response) => this.ref.close(response), 
            error: (err) => console.error('Error:', err)
        })
    }


}
