import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../shared/shared-primeng';
import { NewClientDialogComponent } from '../../mods/clients/components/clients-dialogs/new-client-dialog/new-client-dialog.component';
import { ClientsTableComponent } from '../../mods/clients/components/clients-table/clients-table.component';

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
