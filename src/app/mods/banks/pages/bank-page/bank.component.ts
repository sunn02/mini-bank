import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { ListEvent } from '../../../../shared/utils';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Bank } from '../../models/bank.model';
import { EditBankDialogComponent } from '../../components/bank-dialogs/edit-bank-dialog/edit-bank-dialog.component';
import { NewBankDialogComponent } from '../../components/bank-dialogs/new-bank-dialog/new-bank-dialog.component';
import { BanksTableComponent } from '../../components/bank-table/bank-table.component';
import { AppService } from '../../../../services/app.service';

@Component({
  selector: 'app-banks',
  imports: [BanksTableComponent, SHARED_PRIMENG_MODULES],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.css',
})
export class BanksComponent implements OnInit { 
  
  banks: Bank[] = []; 
  isLoading: boolean = false;

  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService, 
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private appService: AppService) {}


  ngOnInit() {
    this.loadBanks();
  } 


  loadBanks(){
    this.appService.bankApiService.getBanks().subscribe(
      { 
        next: data => { 
          this.banks = <Bank[]>data;
        },
        error: err => {
          console.log(err);
        }
      }
      )
  } 


  onListAction(event: ListEvent) {
    switch (event.type) {
      case 'selected':
        this.messageService.add(
          {summary: `Banco seleccionado: ${event.value.name}`}
        )
        break;
      case 'edit':
        this.onEdit(event.value);
        break;
      case 'delete':
        this.onDelete(event.value);
        break
      default:
        break;
    }

  }



  onAdd() { 
    this.ref = this.dialogService.open(NewBankDialogComponent, {
      header: 'Nuevo Banco',
      closable: true,
      modal: true,
    });


    this.ref.onClose.subscribe(
      (newBank: Bank) => {
        if (newBank) {
          console.log(newBank);
          this.loadBanks();
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Bank added' });
        }
      }
    )
  }


  onEdit(bank: Bank){
    this.ref = this.dialogService.open(EditBankDialogComponent, {
      data: {
        value: bank,
      },
      header: 'Editar Banco',
      closable: true,
      modal: true,
    });

    this.ref.onClose.subscribe( (updatedBank: Bank | undefined) => {
      if ( updatedBank ) {
        console.log(updatedBank);
        this.loadBanks();
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Bank edited' });
      }
    })
  }


  onDelete(bank: Bank) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this Bank?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        rejectButtonProps: {
            label: 'Cancel',
            severity: 'secondary',
            outlined: true,
        },
        acceptButtonProps: {
            label: 'Delete',
            severity: 'danger',
        },

        accept: () => {
            this.appService.bankApiService.deleteBank(bank).subscribe({
                next: () => { console.log(`Se elimino: ${bank.id}`)},
                error: () => { console.error() }
            });
            this.loadBanks();
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Customer deleted' });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        },
    });
}







}
