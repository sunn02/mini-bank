import { Component } from '@angular/core';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { TransactionTableComponent } from '../../components/transaction-table/transaction-table.component';
import { TransferResponse } from '../../models/transaction.model';
import { UiService } from '../../../../services/ui.service';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-transactions',
  imports: [SHARED_PRIMENG_MODULES, TransactionTableComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  transfers: TransferResponse[] = []; 


  constructor(private uiService: UiService,
              private appService: AppService) {}


  ngOnInit() {
    this.loadBanks();
  } 


  loadBanks(){
    this.appService.transactionsApiService.getTransfers().subscribe(
      { 
        next: data => { 
          this.transfers = <TransferResponse[]>data;
        },
        error: err => {
          console.log(err);
        }
      }
      )
  } 

}
