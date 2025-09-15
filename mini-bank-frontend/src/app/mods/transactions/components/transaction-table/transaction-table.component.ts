import { Component, EventEmitter, Input } from '@angular/core';
import { TransferResponse } from '../../models/transaction.model';
import { Currency } from '../../../currency/models/currency.model';
import { TransferApiService } from '../../services/transaction-api.service';
import { AppService } from '../../../../services/app.service';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';

@Component({
  selector: 'app-transaction-table',
  imports: [SHARED_PRIMENG_MODULES],
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.css'
})
export class TransactionTableComponent {

  _list: TransferResponse[] = []; 



  @Input() set list(list: TransferResponse[]) { 
    this._list = list;
  }

}
