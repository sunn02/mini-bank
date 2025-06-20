import { Component, numberAttribute } from '@angular/core';
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

  newName: string = '';
  newDoc: string = '';

  constructor (public ref: DynamicDialogRef) {};

  createCustomer(){
    const newCustomer: Customer = {
      name: this.newName,
      document: this.newDoc
    };  
    
    console.log(newCustomer);

    this.ref.close(newCustomer);

  }

}
