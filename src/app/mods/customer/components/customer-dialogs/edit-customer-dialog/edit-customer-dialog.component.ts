// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
// import { SHARED_PRIMENG_MODULES } from '../../../../../shared/shared-primeng';
// import { Customer } from '../../../models/customer.model';

// @Component({
//   selector: 'app-edit-customer-dialog',
//   imports: [FormsModule, SHARED_PRIMENG_MODULES],
//   templateUrl: './edit-customer-dialog.component.html',
//   styleUrl: './edit-customer-dialog.component.css'
// })
// export class EditCustomerDialogComponent implements OnInit{

//   constructor(private dialogConfig: DynamicDialogConfig, private ref: DynamicDialogRef<EditCustomerDialogComponent>) {}


//   nameToUpdate: string = '';
//   documentToUpdate: string = '';
//   idToUpdate: number = 0;



//   editCustomer(){
//     console.log(this.idToUpdate);
//     const updatedCustomer : Customer = {
//       id: this.idToUpdate,
//       name: this.nameToUpdate,
//       document: this.documentToUpdate,
//     }
//     console.log(updatedCustomer);
    
//     this.ref.close(updatedCustomer);
//   }
  


//   ngOnInit() {
//     this.idToUpdate = this.dialogConfig.data.id;
//   } 

// }
