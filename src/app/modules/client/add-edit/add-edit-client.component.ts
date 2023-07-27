import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';
import { UntypedFormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-client.component.html'
})
export class AddEditClientComponent implements OnInit {

  clientFrm: UntypedFormGroup = this.fromBuilder.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    email: ["", [Validators.email, Validators.required]],
    phoneNumber: ["", [Validators.required]],
    address: ["", Validators.required],
    ice: ["", Validators.required],
    logo: [""],
  });

  @Input() public client_id!: number;
  @Output() public isUpdated: EventEmitter<any> = new EventEmitter();
  client?: Client;
  errMessage?: string;

  constructor(private activeModal: NgbActiveModal, private clientService: ClientService, private fromBuilder: UntypedFormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.client_id) {
      this.clientService.getClientById(this.client_id).subscribe({
        next: res => {
          this.client = res;
          this.initForm(res);
        },
        error: () => {
          this.toastr.error('Something went wrong!');
        }
      });
    }
    else {
      this.initForm();
    }
  }

  updateClient(): void {
    this.errMessage = '';
    if (this.clientFrm.invalid) {
      this.errMessage = 'Fill the form !';
    }
    else {
      this.client = {
        id: this.client_id,
        firstName: this.clientFrm.value.firstName,
        lastName: this.clientFrm.value.lastName,
        email: this.clientFrm.value.email,
        phoneNumber: this.clientFrm.value.phoneNumber,
        address: this.clientFrm.value.address,
        ice: this.clientFrm.value.ice,
        logo: this.clientFrm.value.logo,
      };

      if (this.client_id) {
        this.clientService.updateClient(this.client).subscribe({
          next: res => {
            this.isUpdated.emit(true);
            this.activeModal.close(true);
            this.toastr.success(`Client updated succsessfuly.`);
          },
          error: err => {
            this.toastr.error(`Something went wrong!`);
          }
        });
      }
      else {
        this.clientService.addClient(this.client).subscribe({
          next: res => {
            this.isUpdated.emit(true);
            this.activeModal.close(true);
            this.toastr.success(`Client added succsessfuly.`);
          },
          error: err => {
            this.toastr.error(`Something went wrong!`);
          }
        });
      }
    }
  }

  initForm(client?: Client): void {
    this.clientFrm = this.fromBuilder.group({
      firstName: [client?.firstName, Validators.required],
      lastName: [client?.lastName, Validators.required],
      email: [client?.email, [Validators.email, Validators.required]],
      phoneNumber: [client?.phoneNumber, Validators.required],
      address: [client?.address, Validators.required],
      ice: [client?.ice, [Validators.required]],
      logo: [client?.logo]
    });
  }

  closeModal(): void {
    this.activeModal.close();
  }

}
