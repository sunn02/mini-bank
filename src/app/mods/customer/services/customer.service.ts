// import { Injectable } from '@angular/core';
// import { Customers_DB } from './customer-data.service';
// import { Customer } from '../models/customer.model';

// @Injectable({
//   providedIn: 'root'
// })

// export class CustomersService {

//   constructor() { }

//   customers = Customers_DB; 

//   getcustomers(){
//     return this.customers;
//   }


//   addCustomer(Customer: Customer){
//     const newCustomer = { ...Customer, id: this.generateId() };
//     this.customers.push(newCustomer);
//   }


//   updateCustomer(updatedCustomer: Customer) {
//     const index = this.customers.findIndex(c => c.id === updatedCustomer.id);
//     console.log(index);
//     if (index !== -1) {
//       this.customers[index] = updatedCustomer;
//     }
//   }

//   deleteCustomer(Customer: Customer) {
//     const index = this.customers.findIndex(c => c.id === Customer.id);
//     if (index !== -1) {
//       this.customers.splice(index, 1);
//     }
//   }



//   private generateId(): number {
//     const ids = this.customers
//       .map(c => c.id)
//       .filter((id): id is number => id !== undefined); 
//     return ids.length > 0 ? Math.max(...ids) + 1 : 1;
//   }



// }
