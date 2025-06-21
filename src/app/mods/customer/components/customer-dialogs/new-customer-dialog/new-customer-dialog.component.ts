import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SHARED_PRIMENG_MODULES } from '../../../../../shared/shared-primeng';
import { Customer } from '../../../models/customer.model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
    imports: [FormsModule, SHARED_PRIMENG_MODULES],
    selector: 'app-new-Customer-dialog',
    templateUrl: './new-customer-dialog.component.html',
    styleUrl: './new-customer-dialog.component.css',
})
export class NewCustomerDialogComponent{

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


    constructor (public ref: DynamicDialogRef) {};

    onAddDialog(){
        this.ref.close(this.model);
    }



}
