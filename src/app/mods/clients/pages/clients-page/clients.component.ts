import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { NewClientDialogComponent } from '../../components/clients-dialogs/new-client-dialog/new-client-dialog.component';
import { ClientsTableComponent } from '../../components/clients-table/clients-table.component';
import { Client } from '../../models/client.model';
import { ClientsService } from '../../services/clients.service';
import { ListEvent } from '../../../../shared/utils';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EditClientDialogComponent } from '../../components/clients-dialogs/edit-client-dialog/edit-client-dialog.component';

@Component({
  selector: 'app-clients',
  imports: [ClientsTableComponent, SHARED_PRIMENG_MODULES],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit { // Utilizamos el ciclo de componentes para iniciar la vista con los datos que queremos traer aqui
  
  clients: Client[] = []; 

  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService, private clientService: ClientsService, private messageService: MessageService, private confirmationService: ConfirmationService) {}


  ngOnInit() {
      this.clients = this.clientService.getClients(); // Traemos la lista de clientes original de la api
  }


    /* 
    En este caso, en la tabla tendremos tres acciones que el usuario hara sobre cada item de la tabla:
      - Seleccionar Cliente - Editar Cliente - Eliminar cliente
    Cada click en uno de estos, desencadena alguna logica. Estos se llaman eventos.

    Recibiremos el tipo de accion del hijo (tabla) y aqui nos encargaremos de recibir lo que el hijo ha emitido.
  */

  onListAction(event: ListEvent) {
    switch (event.type) {
      case 'selected':
        this.messageService.add(
          {summary: `El objeto seleccionado \ ${event.value.name}`}
        )
        break;
      case 'edit':
        this.onEdit(event.value);
        break;
      case 'delete':
        this.onDelete(event.value);
        break
      default:
        break;
    }

  }

  onEdit(client: Client){
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
      }
    })
  }


  onDelete(client: Client) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this client?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectButtonProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Delete',
            severity: 'danger',
        },

        accept: () => {
            this.clientService.deleteClient(client.id!);
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Client deleted' });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        },
    });
}



  onAdd() { 
    this.ref = this.dialogService.open(NewClientDialogComponent, {
      header: 'Nuevo Cliente',
      closable: true,
      modal: true,
    });

    this.ref.onClose.subscribe( (newClient : Client) => {
      this.clientService.addClient(newClient);
    })
  }



}
