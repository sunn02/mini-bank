import { Component, numberAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SHARED_PRIMENG_MODULES } from '../../../../../shared/shared-primeng';
import { Client } from '../../../models/client.model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  imports: [FormsModule, SHARED_PRIMENG_MODULES],
  selector: 'app-new-client-dialog',
  templateUrl: './new-client-dialog.component.html',
  styleUrl: './new-client-dialog.component.css',
})
export class NewClientDialogComponent{

  newName: string = '';
  newDoc: string = '';

  constructor (public ref: DynamicDialogRef) {};

  createClient(){
    const newClient: Client = {
      name: this.newName,
      document: this.newDoc
    };  
    
    console.log(newClient);

    this.ref.close(newClient);

  }

}
