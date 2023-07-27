import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Affair } from 'src/app/models/Affair';
import { AffaiService } from 'src/app/services/affair.service';
import { AddEditAffairComponent } from '../add-edit/add-edit-affair.component';
import { Client } from 'src/app/models/Client';

@Component({
  standalone: true,
  selector: 'app-affair',
  templateUrl: './affair-list.component.html',
  imports: [CommonModule]
})
export class AffairListComponent implements OnInit {

  affairs: Affair[] = [];

  constructor(private affairService: AffaiService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAll();
  }

  openAddEdit(entity_id?: number): void {
    const modalRef = this.modalService.open(AddEditAffairComponent, {
      windowClass: "dark-modal",
      modalDialogClass: " modal-lg",
    });
    modalRef.componentInstance.affair_id = entity_id;
    modalRef.componentInstance.isUpdated.subscribe(($event: any) => {
      if ($event) {
        this.ngOnInit();
      }
    })
    modalRef.result.then((result) => { }).catch((error) => { });
  }

  delete(entity_id: any): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You wount be able to revert this.",
      icon: "warning",
      iconColor: "#8B0000",
      showCancelButton: true,
      confirmButtonText: "Yes detete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.affairService.delete(entity_id).subscribe({
          next: res => {
            this.getAll();
            this.toastr.success(res.message);
          },
          error: () => {
            this.toastr.error('Something went wrong!');
          }
        });
      }
    });
  }

  getAll(): void {
    this.affairService.getAll().subscribe({
      next: res => {
        this.affairs = res;
      },
      error: () => {
        this.toastr.error('Something went wrong!');
      }
    })
  }

  getClientFullname(client?: Client): string{
    return `${client?.firstName} ${client?.lastName}`;
  }
}
