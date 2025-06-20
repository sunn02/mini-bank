import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Customer } from '../../models/customer.model';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { ListEvent } from '../../../../shared/utils';


@Component({
  selector: 'app-customers-table',
  imports: [CommonModule, SHARED_PRIMENG_MODULES],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.css',
})


export class CustomersTableComponent {

  ref: DynamicDialogRef | undefined;
  constructor() {}


  _list: Customer[] = []; /* Creamos una lista unica de este componente, lo hacemos para no afectar el original


  /*
  Utilizamos @Input() para que este componente solo tenga la responsabilidad 
  de renderizar la lista. @Input() permite recibir datos desde el componente padre,
  que es donde haremos la comunicación con la API.
  */

  @Input() set list(list: Customer[]) { 
    /* Set nos permite reaccionar cuando el valor recibido del padre cambia, ya sea un nuevo Customere o edicion 
    Asi, nos permite copiar la lista original y almacenarla al duplicado */
    this._list = list;
  }


  @Output() action = new EventEmitter<ListEvent>(); // Definimos que tipo de evento enviaremos al padre, la lista de eventos lo defininimos como tipo y valor


  emitEvent(eventType: string, Customer: any){
  this.action.emit(
      {
        type: eventType,
        value: Customer
      }
    );
  }

  onRowClick(Customer: any){
    this.emitEvent('selected', Customer);
  }

  onEdit(Customer: any){
    this.emitEvent('edit', Customer);
  }

  onDelete(Customer: any){
    this.emitEvent('delete', Customer);
  }


}
