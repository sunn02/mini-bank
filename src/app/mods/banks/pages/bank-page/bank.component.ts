import { Component, OnInit } from '@angular/core';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { ListEvent } from '../../../../shared/utils';
import { Bank } from '../../models/bank.model';
import { EditBankDialogComponent } from '../../components/bank-dialogs/edit-bank-dialog/edit-bank-dialog.component';
import { NewBankDialogComponent } from '../../components/bank-dialogs/new-bank-dialog/new-bank-dialog.component';
import { BanksTableComponent } from '../../components/bank-table/bank-table.component';
import { AppService } from '../../../../services/app.service';
import { UiService } from '../../../../services/ui.service';

@Component({
  selector: 'app-banks',
  imports: [BanksTableComponent, SHARED_PRIMENG_MODULES],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.css',
})
export class BanksComponent implements OnInit { 
  
  banks: Bank[] = []; 
  isLoading: boolean = false;


  constructor(private uiService: UiService,
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
          this.uiService.showMessage('Banco seleccionado', `Nombre: ${event.value.name}`, 'info');
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
    this.uiService.openDialog<Bank>(NewBankDialogComponent, {
        header: 'Nuevo Banco',
        closable: true,
        modal: true,
      })
      .subscribe((newBank: Bank) => {
        if (newBank) {
          this.loadBanks();
          this.uiService.showMessage('Confirmado', 'Banco agregado', 'info');
        }

      });
  }


  onEdit(bank: Bank){
    this.uiService.openDialog<Bank>(EditBankDialogComponent, {
        data: { value: bank },
        header: 'Editar Banco',
        closable: true,
        modal: true,
      })
      .subscribe((updatedBank: Bank) => {
        if (updatedBank) {
            this.loadBanks();
            this.uiService.showMessage('Confirmado', 'Banco editado', 'info');
        }

      });
  }


  onDelete(bank: Bank) {
  this.uiService.confirmAction({
      message: '¿Deseás eliminar este banco?',
      header: 'Zona de riesgo',
      accept: () => {
        this.appService.bankApiService.deleteBank(bank).subscribe({
          next: () => {
            this.loadBanks();
            this.uiService.showMessage('Confirmado', 'Banco eliminado', 'info');
          },
          error: () => {
            this.uiService.showMessage('Error', 'No se pudo eliminar el banco', 'error');
          },
        });
      },
    });
  }
}








