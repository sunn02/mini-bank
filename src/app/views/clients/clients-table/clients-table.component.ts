import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditClientDialogComponent } from '../clients-dialogs/edit-client-dialog/edit-client-dialog.component';
import { ClientsService } from '../../../services/clients.service';
import { Client } from '../../../models/client.model';
import { SHARED_PRIMENG_MODULES } from '../../../shared/shared-primeng';


@Component({
  selector: 'app-clients-table',
  imports: [CommonModule, SHARED_PRIMENG_MODULES],
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.css',
})


export class ClientsTableComponent {

  ref: DynamicDialogRef | undefined;
  constructor(private dialogService: DialogService, private clientService: ClientsService) {}


  clients: Client[] = []; 

  getUsers(){
    this.clients = this.clientService.getClients();
  }



  showEditDialog(client: Client) {
    this.ref = this.dialogService.open(EditClientDialogComponent, {
      data: {
        id: client.id,
      },
      header: 'Editar Cliente',
      closable: true,
      modal: true,
    });


    this.ref.onClose.subscribe( (updatedClient: Client | undefined) => {

      if ( updatedClient ) {
          this.clientService.updateClient(updatedClient);
          this.getUsers();
      }
    })
    
  }

  deleteClient(id: number){
    this.clientService.deleteClient(id);
    console.log(`Se elimino ${id}`);
    this.getUsers();
  }



  ngOnInit(){
    this.getUsers();
  }

}
