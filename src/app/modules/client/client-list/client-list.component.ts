import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { CommonModule } from '@angular/common';
import { ClientService } from 'src/app/services/client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditClientComponent } from '../add-edit/add-edit-client.component';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';

@Component({
  standalone: true,
  selector: 'app-client',
  templateUrl: './client-list.component.html',
  imports: [CommonModule]
})
export class ClientListComponent implements OnInit {

  clients: Client[] = [];

  constructor(private clientService: ClientService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshClient();
  }

  openAddEdit(client_id?: number) {
    const modalRef = this.modalService.open(AddEditClientComponent, {
      windowClass: "dark-modal",
      modalDialogClass: " modal-lg",
    });
    modalRef.componentInstance.client_id = client_id;
    modalRef.componentInstance.isUpdated.subscribe(($event: any) => {
      if ($event) {
        this.ngOnInit();
      }
    })
    modalRef.result.then((result) => { }).catch((error) => { });
  }

  deleteClient(client_id: any) {
    import('sweetalert2').then(Swal => {
      Swal.default.fire({
        title: "Are you sure?",
        text: "You wount be able to revert this.",
        icon: "warning",
        iconColor: "#8B0000",
        showCancelButton: true,
        confirmButtonText: "Yes detete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.clientService.deleteClient(client_id).subscribe(() => {
            this.refreshClient();
            this.toastr.success(`Client deleted succsessfuly.`);
          });
        }
      });
    });
  }

  refreshClient() {
    this.clientService.getAll().subscribe({
      next: res => {
        this.clients = res;
      },
      error: () => {
        this.toastr.error(`Something went wrong!`);
      }
    });
  }

  getImageUrl(logo: string): string {
    return `${environment.apiUrl }file/find/${logo}`;
  }

}
