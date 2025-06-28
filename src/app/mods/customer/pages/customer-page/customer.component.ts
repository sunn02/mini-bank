import { Component, OnInit } from '@angular/core';
import { SHARED_PRIMENG_MODULES } from '../../../../shared/shared-primeng';
import { Customer } from '../../models/customer.model';
import { ListEvent } from '../../../../shared/utils';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CustomersTableComponent } from '../../components/customer-table/customer-table.component';
import { AppService } from '../../../../services/app.service';
import { NewCustomerDialogComponent } from '../../components/customer-dialogs/new-customer-dialog/new-customer-dialog.component';
import { EditCustomerDialogComponent } from '../../components/customer-dialogs/edit-customer-dialog/edit-customer-dialog.component';
import { UiService } from '../../../../services/ui.service';

@Component({
  selector: 'app-Customers',
  imports: [CustomersTableComponent, SHARED_PRIMENG_MODULES],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomersComponent implements OnInit { 
  

  constructor(private appService: AppService,
              private uiService: UiService, 
              ) {}

  customers: Customer[] = [];


  ngOnInit() {
    this.loadCustomers();
  } 


  loadCustomers(){
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
          this.uiService.showMessage('Cliente seleccionado', `Nombre: ${event.value.name}`, 'info');
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
    this.uiService.openDialog<Customer>(NewCustomerDialogComponent, {
        header: 'Nuevo Cliente',
        closable: true,
        modal: true,
      })
      .subscribe((newCustomer: Customer) => {
        if (newCustomer) {
          this.loadCustomers();
          this.uiService.showMessage('Confirmado', 'Cliente agregado', 'info');
        }

      });
  }


  onEdit(customer: Customer){
      this.uiService.openDialog<Customer>(EditCustomerDialogComponent, {
        data: { value: customer },
        header: 'Editar Cliente',
        closable: true,
        modal: true,
      })
      .subscribe((updatedCustomer: Customer) => {
        if (updatedCustomer) {
            this.loadCustomers();
            this.uiService.showMessage('Confirmado', 'Cliente editado', 'info');
        }

      });
  }



  onDelete(customer: Customer) {
      this.uiService.confirmAction({
      message: '¿Deseás eliminar este cliente?',
      header: 'Zona de riesgo',
      accept: () => {
        this.appService.customerApiService.deleteCustomer(customer).subscribe({
          next: () => {
            this.loadCustomers();
            this.uiService.showMessage('Confirmado', 'Cliente eliminado', 'info');
          },
          error: () => {
            this.uiService.showMessage('Error', 'No se pudo eliminar el cliente', 'error');
          },
        });
      },
    });
  }

}








