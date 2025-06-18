import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SHARED_PRIMENG_MODULES } from '../../../../../shared/shared-primeng';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-edit-client-dialog',
  imports: [FormsModule, SHARED_PRIMENG_MODULES],
  templateUrl: './edit-client-dialog.component.html',
  styleUrl: './edit-client-dialog.component.css'
})
export class EditClientDialogComponent implements OnInit{

  constructor(private dialogConfig: DynamicDialogConfig, private ref: DynamicDialogRef<EditClientDialogComponent>) {}


  nameToUpdate: string = '';
  documentToUpdate: string = '';
  idToUpdate: number = 0;



  editClient(){
    console.log(this.idToUpdate);
    const updatedClient : Client = {
      id: this.idToUpdate,
      name: this.nameToUpdate,
      document: this.documentToUpdate,
    }
    console.log(updatedClient);
    
    this.ref.close(updatedClient);
  }
  


  ngOnInit() {
    this.idToUpdate = this.dialogConfig.data.id;
  } 

}
