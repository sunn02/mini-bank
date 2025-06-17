import { Component } from '@angular/core';
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewClientDialogComponent } from './clients-dialogs/new-client-dialog/new-client-dialog.component';
import { SHARED_PRIMENG_MODULES } from '../../shared/shared-primeng';

@Component({
  selector: 'app-clients',
  imports: [ClientsTableComponent, SHARED_PRIMENG_MODULES],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
  providers: [DialogService],
})
export class ClientsComponent {
  
  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService) {}

  showDialog() { 
    this.ref = this.dialogService.open(NewClientDialogComponent, {
      header: 'Nuevo Cliente',
      closable: true,
      modal: true,
    });
  }


}
