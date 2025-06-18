import { Injectable } from '@angular/core';
import { CLIENTS_DB } from './clients-data.service';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})

export class ClientsService {

  constructor() { }

  clients = CLIENTS_DB; 

  getClients(){
    return this.clients;
  }


  addClient(client: Client){
    const newClient = { ...client, id: this.generateId() };
    this.clients.push(newClient);
  }


  updateClient(updatedClient: Client) {
    const index = this.clients.findIndex(c => c.id === updatedClient.id);
    console.log(index);
    if (index !== -1) {
      this.clients[index] = updatedClient;
    }
  }

  deleteClient(client: Client) {
    const index = this.clients.findIndex(c => c.id === client.id);
    if (index !== -1) {
      this.clients.splice(index, 1);
    }
  }



  private generateId(): number {
    const ids = this.clients
      .map(c => c.id)
      .filter((id): id is number => id !== undefined); 
    return ids.length > 0 ? Math.max(...ids) + 1 : 1;
  }



}
