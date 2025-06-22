import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { ListEvent } from '../../../../shared/utils';
import { Bank } from '../../models/bank.model';


@Component({
  selector: 'app-banks-table',
  imports: [CommonModule, SHARED_PRIMENG_MODULES],
  templateUrl: './bank-table.component.html',
  styleUrl: './bank-table.component.css',
})


export class BanksTableComponent {

  ref: DynamicDialogRef | undefined;
  constructor() {}


  _list: Bank[] = []; 



  @Input() set list(list: Bank[]) { 
    this._list = list;
  }


  @Output() action = new EventEmitter<ListEvent>(); // Definimos que tipo de evento enviaremos al padre, la lista de eventos lo defininimos como tipo y valor


  emitEvent(eventType: string, Bank: any){
  this.action.emit(
      {
        type: eventType,
        value: Bank
      }
    );
  }

  onRowClick(Bank: any){
    this.emitEvent('selected', Bank);
  }

  onEdit(Bank: any){
    this.emitEvent('edit', Bank);
  }

  onDelete(Bank: any){
    this.emitEvent('delete', Bank);
  }


}
