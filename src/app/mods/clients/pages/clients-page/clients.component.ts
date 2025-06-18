import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { NewClientDialogComponent } from '../../components/clients-dialogs/new-client-dialog/new-client-dialog.component';
import { ClientsTableComponent } from '../../components/clients-table/clients-table.component';
import { Client } from '../../models/client.model';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-clients',
  imports: [ClientsTableComponent, SHARED_PRIMENG_MODULES],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit { // Utilizamos el ciclo de componentes para iniciar la vista con los datos que queremos traer aqui
  
  clients: Client[] = []; 

  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService, private clientService: ClientsService) {}


  /* 
    En este caso, en la tabla tendremos tres acciones que el usuario hara sobre cada item de la tabla:
      - Seleccionar Cliente - Editar Cliente - Eliminar cliente
    Cada click en uno de estos, desencadena alguna logica. Estos se llaman eventos.
  */



  

  showDialog() { 
    this.ref = this.dialogService.open(NewClientDialogComponent, {
      header: 'Nuevo Cliente',
      closable: true,
      modal: true,
    });
  }



  ngOnInit() {
      this.clients = this.clientService.getClients(); // Traemos la lista de clientes original de la api
  }


}
