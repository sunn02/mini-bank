import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountResponse } from '../../models/account.model';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { ListEvent } from '../../../../shared/utils';
import { Bank } from '../../../banks/models/bank.model';


@Component({
  selector: 'app-account-table',
  imports: [CommonModule, SHARED_PRIMENG_MODULES],
  templateUrl: './account-table.component.html',
  styleUrl: './account-table.component.css',
})


export class AccountsTableComponent {

  ref: DynamicDialogRef | undefined;
  constructor() {}


  _list: AccountResponse[] = []; 
  _banks: Bank[] = []; 


  @Input() set list(list: AccountResponse[]) { 
    this._list = list;
  }

  @Input() set bankList(list: Bank[]) {
    this._banks = list;
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

  getBankName(bankId: number): string {
    const bank = this._banks.find(b => b.id === bankId);
    return bank ? bank.name : '';
  }


}
