import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditClientDialogComponent } from '../clients-dialogs/edit-client-dialog/edit-client-dialog.component';
import { Client } from '../../models/client.model';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { ClientsService } from '../../services/clients.service';


@Component({
  selector: 'app-clients-table',
  imports: [CommonModule, SHARED_PRIMENG_MODULES],
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.css',
})


export class ClientsTableComponent {

  ref: DynamicDialogRef | undefined;
  constructor(private dialogService: DialogService, private clientService: ClientsService) {}


  _list: Client[] = []; /* Creamos una lista unica de este componente, lo hacemos para no afectar el original


  /*
  Utilizamos @Input() para que este componente solo tenga la responsabilidad 
  de renderizar la lista. @Input() permite recibir datos desde el componente padre,
  que es donde haremos la comunicación con la API.
  */

  @Input() set list(list: Client[]) { 
    /* Set nos permite reaccionar cuando el valor recibido del padre cambia, ya sea un nuevo cliente o edicion 
    Asi, nos permite copiar la lista original y almacenarla al duplicado */
    this._list = list;
  }



  /*  Cambiar aqui !! 
    Para que table component solo muestre la lista y responda a los eventos de los botones */ 

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
      }
    })
    
  }

  deleteClient(id: number){
    this.clientService.deleteClient(id);
    console.log(`Se elimino ${id}`);
  }


}
