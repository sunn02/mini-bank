import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Account } from '../../models/account.model';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { ListEvent } from '../../../../shared/utils';


@Component({
  selector: 'app-account-table',
  imports: [CommonModule, SHARED_PRIMENG_MODULES],
  templateUrl: './account-table.component.html',
  styleUrl: './account-table.component.css',
})


export class AccountsTableComponent {

  ref: DynamicDialogRef | undefined;
  constructor() {}


  _list: Account[] = []; 


  @Input() set list(list: Account[]) { 
    
    this._list = list;
  }


  @Output() action = new EventEmitter<ListEvent>(); 


  emitEvent(eventType: string, Account: any){
  this.action.emit(
      {
        type: eventType,
        value: Account
      }
    );
  }

  onRowClick(Account: any){
    this.emitEvent('selected', Account);
  }

  onEdit(Account: any){
    this.emitEvent('edit', Account);
  }

  onDelete(Account: any){
    this.emitEvent('delete', Account);
  }


}
