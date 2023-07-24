import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { CommonModule } from '@angular/common';
import { ClientService } from 'src/app/services/client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddClientComponent } from '../add-client/add-client.component';
import Swal from 'sweetalert2';
import { UpdateClientComponent } from '../update-client/update-client.component';

@Component({
  standalone: true,
  selector: 'app-client',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  imports: [CommonModule]
})
export class ClientListComponent implements OnInit {

  clients: Client[] = [];

  constructor(private clientService: ClientService, private modalService: NgbModal) { }

  ngOnInit(): void {
   this.refreshClient();
  }

  openAddModal() {
    const modalRef = this.modalService.open(AddClientComponent, {
      windowClass: "dark-modal",
      modalDialogClass: " modal-lg",
    });
    modalRef.componentInstance.isAdded.subscribe(($event: any) => {
      if($event){
        this.ngOnInit();
      }
    })
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    }).catch((error) => { });
  }

  openUpdatecomponent(client_id: any) {
    const modalRef = this.modalService.open(UpdateClientComponent, {
      windowClass: "dark-modal",
      modalDialogClass: " modal-lg",
    });
    modalRef.componentInstance.client_id = client_id;
    modalRef.componentInstance.isUpdated.subscribe(($event: any) => {
      if($event){
        this.ngOnInit();
      }
    })
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    }).catch((error) => { });
  }

  deleteClient(client_id: any) {
    Swal.fire({
      title: "Deletion",
      text: "Are you sure about deleting this client ?",
      icon: "warning",
      iconColor: "#8B0000",
      showCancelButton: true,
      confirmButtonText: "Yes detete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(client_id).subscribe( () => {
          this.refreshClient();
        });
      }
    });
  }

  refreshClient(){
    this.clientService.getAll().subscribe({
      next: res => {
        this.clients = res;
      }
    })
  }
}
