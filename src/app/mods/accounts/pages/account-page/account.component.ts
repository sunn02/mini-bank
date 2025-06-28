import { Component, OnInit } from '@angular/core';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { NewAccountDialogComponent } from '../../components/account-dialogs/new-account-dialog/new-account-dialog.component';
import { AccountResponse, AccountPostRequest, AccountPutRequest } from '../../models/account.model';
import { ListEvent } from '../../../../shared/utils';
import { AccountsTableComponent } from '../../components/account-table/account-table.component';
import { EditAccountDialogComponent } from '../../components/account-dialogs/edit-account-dialog/edit-account-dialog.component';
import { AppService } from '../../../../services/app.service';
import { UiService } from '../../../../services/ui.service';

@Component({
    selector: 'app-Customers',
    imports: [AccountsTableComponent, SHARED_PRIMENG_MODULES],
    templateUrl: './account.component.html',
    styleUrl: './account.component.css',
})
export class AccountsComponent implements OnInit { 
    

    constructor(
            private uiService: UiService, 
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
            this.uiService.showMessage('Cuenta seleccionada', `Titular: ${event.value.holder}`, 'info');
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
        this.uiService.openDialog<AccountPostRequest>(NewAccountDialogComponent, {
        header: 'Nueva Cuenta',
        closable: true,
        modal: true,
        }).subscribe((newAccount: AccountPostRequest) => {
            if (newAccount) {
            this.loadAccounts();
            this.uiService.showMessage('Confirmado', 'Cuenta agregada', 'info');
            }
        });
    }


    onEdit(account: AccountPutRequest){
        this.uiService.openDialog<AccountPutRequest>(EditAccountDialogComponent, {
            data: { value: account },
            header: 'Editar Cuenta',
            closable: true,
            modal: true,
    }).subscribe((updatedAccount: AccountPutRequest) => {
        if (updatedAccount) {
            this.loadAccounts();
            this.uiService.showMessage('Confirmado', 'Cuenta editada', 'info');
        }});
    }


    onDelete(account: AccountResponse) {
        this.uiService.confirmAction({
            message: '¿Deseás eliminar esta cuenta?',
            header: 'Zona de riesgo',
            accept: () => {
                this.appService.accountApiService.deleteAccount(account).subscribe({
                next: () => {
                    this.loadAccounts();
                    this.uiService.showMessage('Confirmado', 'Cuenta eliminada', 'info');
                },
                error: () => {
                    this.uiService.showMessage('Error', 'No se pudo eliminar la cuenta', 'error');
                },
                });
            },
            });
        }
    }






