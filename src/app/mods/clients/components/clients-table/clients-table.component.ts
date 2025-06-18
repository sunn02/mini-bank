import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Client } from '../../models/client.model';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { ClientsService } from '../../services/clients.service';
import { ListEvent } from '../../../../shared/utils';


@Component({
  selector: 'app-clients-table',
  imports: [CommonModule, SHARED_PRIMENG_MODULES],
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.css',
})


export class ClientsTableComponent {

  ref: DynamicDialogRef | undefined;
  constructor() {}


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


  @Output() action = new EventEmitter<ListEvent>(); // Definimos que tipo de evento enviaremos al padre, la lista de eventos lo defininimos como tipo y valor


  emitEvent(eventType: string, client: any){
  this.action.emit(
      {
        type: eventType,
        value: client
      }
    );
  }

  onRowClick(client: any){
    this.emitEvent('selected', client);
  }

  onEdit(client: any){
    this.emitEvent('edit', client);
  }

  onDelete(client: any){
    this.emitEvent('delete', client);
  }


}
