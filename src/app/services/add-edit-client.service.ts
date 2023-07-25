import { Injectable } from '@angular/core';
import { Client } from '../models/Client';
import { ClientService } from './client.service';

@Injectable({
  providedIn: 'root'
})
export class AddEditClientService {

  modalId: string = 'add-edit-client';
  client?: Client;

  constructor(private clientService: ClientService) { }

  initClient(): void{
    this.client = new Client();
    
    this.openModal();
  }

  getClient(id: number): void{
    this.clientService.getById(id).subscribe({
      next: res => {
        this.client = res;
        this.openModal();
      }, 
      error: err => {
        alert(err);
      }
    })
  }

  save(): void{
    this.clientService.add(this.client as Client).subscribe({
      next: res => {
        this.client = res;
      },
      error: err => {
        alert(err);
      }
    })
  }

  cancel(): void{
    this.client = new Client();

    this.closeModal();
  }

  closeModal(): void {
    document.getElementById(this.modalId)?.classList.remove('show-modal');
  }

  openModal(): void {
    document.getElementById(this.modalId)?.classList.add('show-modal');
  }

}
