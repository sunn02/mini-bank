import { Component, numberAttribute } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClientsService } from '../../../services/clients.service';
import { SHARED_PRIMENG_MODULES } from '../../../../../shared/shared-primeng';
import { Client } from '../../../models/client.model';


@Component({
  imports: [FormsModule, SHARED_PRIMENG_MODULES],
  selector: 'app-new-client-dialog',
  templateUrl: './new-client-dialog.component.html',
  styleUrl: './new-client-dialog.component.css',
})
export class NewClientDialogComponent{

  newName: string = '';
  newDoc: string = '';

  constructor (private clientService: ClientsService) {};

  createClient(){
    const newClient: Client = {
      name: this.newName,
      document: this.newDoc
    };  
    
    console.log(newClient);
    this.clientService.addClient(newClient);
  }

}
