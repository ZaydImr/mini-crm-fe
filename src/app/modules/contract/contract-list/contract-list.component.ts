import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Contract } from 'src/app/models/Contract';
import { ContractService } from 'src/app/services/contract.service';
import { AddEditContractComponent } from '../add-edit/add-edit-contract.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-contract',
  templateUrl: './contract-list.component.html',
  imports: [CommonModule]
})
export class ContractListComponent implements OnInit {

  contracts: Contract[] = [];

  constructor(private contractService: ContractService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAll();
  }

  openAddEdit(entity_id?: number): void {
    const modalRef = this.modalService.open(AddEditContractComponent, {
      windowClass: "dark-modal",
      modalDialogClass: " modal-lg",
    });
    modalRef.componentInstance.numContract = entity_id;
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
        this.contractService.delete(entity_id).subscribe({
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
    this.contractService.getAll().subscribe({
      next: res => {
        this.contracts = res;
      },
      error: () => {
        this.toastr.error('Something went wrong!');
      }
    })
  }

}
