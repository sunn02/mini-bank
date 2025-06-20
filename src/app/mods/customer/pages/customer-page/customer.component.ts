import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { NewCustomerDialogComponent } from '../../components/customer-dialogs/new-customer-dialog/new-customer-dialog.component';
import { Customer } from '../../models/customer.model';
import { ListEvent } from '../../../../shared/utils';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EditCustomerDialogComponent } from '../../components/customer-dialogs/edit-customer-dialog/edit-customer-dialog.component';
import { CustomersTableComponent } from '../../components/customer-table/customer-table.component';
import { CustomersService } from '../../services/customer.service';

@Component({
  selector: 'app-Customers',
  imports: [CustomersTableComponent, SHARED_PRIMENG_MODULES],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomersComponent implements OnInit { // Utilizamos el ciclo de componentes para iniciar la vista con los datos que queremos traer aqui
  
  customers: Customer[] = []; 

  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService, private customerService: CustomersService, private messageService: MessageService, private confirmationService: ConfirmationService) {}


  ngOnInit() {
      this.customers = this.customerService.getcustomers(); // Traemos la lista de Customeres original de la api
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
          {summary: `El objeto seleccionado \ ${event.value.name}`}
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

  onEdit(Customer: Customer){
    this.ref = this.dialogService.open(EditCustomerDialogComponent, {
      data: {
        id: Customer.id,
      },
      header: 'Editar Customere',
      closable: true,
      modal: true,
    });

    this.ref.onClose.subscribe( (updatedCustomer: Customer | undefined) => {
      if ( updatedCustomer ) {
          this.customerService.updateCustomer(updatedCustomer);
      }
    })
  }


  onDelete(Customer: Customer) {
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
            this.customerService.deleteCustomer(Customer);
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Customer deleted' });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        },
    });
}



  onAdd() { 
    this.ref = this.dialogService.open(NewCustomerDialogComponent, {
      header: 'Nuevo Cliente',
      closable: true,
      modal: true,
    });

    this.ref.onClose.subscribe( (newCustomer : Customer) => {
      if (newCustomer) {
        this.customerService.addCustomer(newCustomer);
      }
    })
  }



}
