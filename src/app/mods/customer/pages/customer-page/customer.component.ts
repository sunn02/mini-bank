import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { Customer } from '../../models/customer.model';
import { ListEvent } from '../../../../shared/utils';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomersTableComponent } from '../../components/customer-table/customer-table.component';
import { AppService } from '../../../../services/app.service';
import { NewCustomerDialogComponent } from '../../components/customer-dialogs/new-customer-dialog/new-customer-dialog.component';
import { EditCustomerDialogComponent } from '../../components/customer-dialogs/edit-customer-dialog/edit-customer-dialog.component';

@Component({
  selector: 'app-Customers',
  imports: [CustomersTableComponent, SHARED_PRIMENG_MODULES],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomersComponent implements OnInit { 
  
  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService, 
              private appService: AppService,
              private messageService: MessageService, 
              private confirmationService: ConfirmationService,
              ) {}

  customers: Customer[] = [];


  ngOnInit() {
    this.loadCostumers();
  } 


  loadCostumers(){
    return this.appService.customerApiService.getCostumers().subscribe( (data) => { this.customers = data });
  } 

    /* 
    En este caso, en la tabla tendremos tres acciones que el usuario hara sobre cada item de la tabla:
      - Seleccionar Customers - Editar Customers - Eliminar Customers
    Cada click en uno de estos, desencadena alguna logica. Estos se llaman eventos.

    Recibiremos el tipo de accion del hijo (tabla) y aqui nos encargaremos de recibir lo que el hijo ha emitido.
  */

  onListAction(event: ListEvent) {
    switch (event.type) {
      case 'selected':
        // this.messageService.add(
        //   {summary: `Usuario seleccionado: ${event.value.name}`}
        // )
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
    this.ref = this.dialogService.open(NewCustomerDialogComponent, {
      header: 'Nuevo Cliente',
      closable: true,
      modal: true,
    });


    this.ref.onClose.subscribe(
      (newCustomer: Customer) => {
        if (newCustomer) {
          console.log(newCustomer);
          this.loadCostumers();
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Customer added' });
        }
      }
    )
  }


  onEdit(customer: Customer){
    this.ref = this.dialogService.open(EditCustomerDialogComponent, {
      data: {
        value: customer,
      },
      header: 'Editar Cliente',
      closable: true,
      modal: true,
    });

    this.ref.onClose.subscribe( (updatedCustomer: Customer | undefined) => {

      if ( updatedCustomer ) {
        console.log(updatedCustomer);
        this.loadCostumers();
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Customer edited' });
      } 
    });
  }



  onDelete(customer: Customer) {
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
            this.appService.customerApiService.deleteCustomer(customer).subscribe({
                next: () => { console.log(`Se elimino: ${customer.id}`)},
                error: () => { console.error() }
            });
            this.loadCostumers();
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Customer deleted' });

        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
        },
    });
}







}
