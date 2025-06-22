import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { NewAccountDialogComponent } from '../../components/account-dialogs/new-account-dialog/new-account-dialog.component';
import { Account } from '../../models/account.model';
import { ListEvent } from '../../../../shared/utils';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccountsTableComponent } from '../../components/account-table/account-table.component';
import { CustomerApiService } from '../../services/account-api.service';
import { EditAccountDialogComponent } from '../../components/account-dialogs/edit-account-dialog/edit-account-dialog.component';

@Component({
  selector: 'app-Customers',
  imports: [AccountsTableComponent, SHARED_PRIMENG_MODULES],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountsComponent implements OnInit { 
  
  accounts: Account[] = []; 

  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService, 
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              private apiService: CustomerApiService) {}


  ngOnInit() {
    this.fetchData();
  } 


  fetchData(){
    this.apiService.getData().subscribe(
      { 
        next: data => { this.accounts = <Account[]>data} // Especificamos el tipo de dato que esperamos recibir como respuesta De la solicitud HTTP
      }
      )
  } 


    /* 
    En este caso, en la tabla tendremos tres acciones que el usuario hara sobre cada item de la tabla:
      - Seleccionar Customere - Editar Customere - Eliminar Customere
    Cada click en uno de estos, desencadena alguna logica. Estos se llaman eventos.

    Recibiremos el tipo de accion del hijo (tabla) y aqui nos encargaremos de recibir lo que el hijo ha emitido.
  */

  onListAction(event: ListEvent) {
    switch (event.type) {
      case 'selected':
        this.messageService.add(
          {summary: `Cuenta seleccionado: ${event.value.name}`}
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
    this.ref = this.dialogService.open(NewAccountDialogComponent, {
      header: 'Nueva Cuenta',
      closable: true,
      modal: true,
    });


    this.ref.onClose.subscribe(
      (newAccount: Account) => {
        if (newAccount) {
          console.log(newAccount);
        }
      }
    )
  }


  onEdit(account: Account){
    this.ref = this.dialogService.open(EditAccountDialogComponent, {
      data: {
        value: account,
      },
      header: 'Editar Cuenta',
      closable: true,
      modal: true,
    });

    this.ref.onClose.subscribe( (updatedAccount: Account | undefined) => {
      if ( updatedAccount ) {
        console.log(updatedAccount);
        this.fetchData();
      }
    })
  }


  onDelete(account: Account) {
    this.confirmationService.confirm({
        message: 'Do you want to delete this Customer?',
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
            this.apiService.deleteData(account).subscribe({
                next: () => { console.log(`Se elimino: ${account.id}`)},
                error: () => { console.error() }
            });
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Customer deleted' });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        },
    });
}







}
