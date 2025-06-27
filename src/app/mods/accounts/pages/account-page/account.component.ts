import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { NewAccountDialogComponent } from '../../components/account-dialogs/new-account-dialog/new-account-dialog.component';
import { AccountResponse, AccountPostRequest, AccountPutRequest } from '../../models/account.model';
import { ListEvent } from '../../../../shared/utils';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AccountsTableComponent } from '../../components/account-table/account-table.component';
import { EditAccountDialogComponent } from '../../components/account-dialogs/edit-account-dialog/edit-account-dialog.component';
import { AppService } from '../../../../services/app.service';

@Component({
    selector: 'app-Customers',
    imports: [AccountsTableComponent, SHARED_PRIMENG_MODULES],
    templateUrl: './account.component.html',
    styleUrl: './account.component.css',
})
export class AccountsComponent implements OnInit { 
    

    ref: DynamicDialogRef | undefined;

    constructor(private dialogService: DialogService, 
            private messageService: MessageService, 
            private confirmationService: ConfirmationService,
            private appService: AppService) {}

    accounts: AccountResponse[] = []; 
    

    ngOnInit() {
        this.loadAccounts();
    } 


    loadAccounts(){
        return this.appService.accountApiService.getAccounts().subscribe( (data) => { this.accounts = data });;
    } 


    onListAction(event: ListEvent) {
        switch (event.type) {
        case 'selected':
            this.messageService.add(
            {summary: `Cuenta seleccionado: ${event.value.holder}`}
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
        (newAccount: AccountPostRequest ) => {
            if (newAccount) {
            console.log(newAccount);
            this.loadAccounts();
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Customer added' });
            }
        }
        )
    }


    onEdit(account: AccountPutRequest){
        this.ref = this.dialogService.open(EditAccountDialogComponent, {
        data: {
            value: account,
        },
        header: 'Editar Cuenta',
        closable: true,
        modal: true,
        });

        this.ref.onClose.subscribe( (updatedAccount: AccountPutRequest | undefined) => {
        if ( updatedAccount ) {
            console.log(updatedAccount);
            this.loadAccounts();
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Accoun edited' });
        }
        })
    }


    onDelete(account: AccountResponse) {
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
                this.appService.accountApiService.deleteAccount(account).subscribe({
                    next: () => { console.log(`Se elimino: ${account.id}`)},
                    error: () => { console.error() }
                });
                this.loadAccounts();
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Account deleted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            },
        });
    }







}
