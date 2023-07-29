import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators, FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContractService } from 'src/app/services/contract.service';
import { Contract } from 'src/app/models/Contract';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-update-contract',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-edit-contract.component.html'
})
export class AddEditContractComponent implements OnInit {

  @Input() public numContract!: number;
  @Output() public isUpdated: EventEmitter<any> = new EventEmitter();

  entity?: Contract;
  client_id?: number;
  clients: Client[] = [];
  errMessage?: string;
  entityFrm: UntypedFormGroup = this.fromBuilder.group({
    numContract: [null, Validators.required],
    startDate: [null, Validators.required],
    endDate: [null, [Validators.required]],
    type: [null, Validators.required],
    // lienDeSignature: [null, Validators.required]
  });

  constructor(private activeModal: NgbActiveModal, private toastr: ToastrService, private clientService: ClientService, private entityService: ContractService, private fromBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    if (this.numContract) {
      this.entityService.getById(this.numContract).subscribe({
        next: res => {
          this.entity = res;
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
    this.getClients();
  }

  updateClient(): void {
    this.errMessage = '';
    if (this.entityFrm.invalid || !this.client_id) {
      this.errMessage = 'Fill the form !';
    }
    else {
      this.entity = {
        startDate: this.entityFrm.value.startDate,
        endDate: this.entityFrm.value.endDate,
        type: this.entityFrm.value.type,
        lienDeSignature: this.entityFrm.value.lienDeSignature,
        client: this.getClient(this.client_id as number),
      };

      if (this.numContract) {
        this.entity.numContract = this.numContract;
        this.entityService.update(this.entity).subscribe({
          next: res => {
            this.isUpdated.emit(true);
            this.activeModal.close(true);
            this.toastr.success(`Contract updated succsessfuly.`);
          },
          error: err => {
            this.toastr.error(`Something went wrong!`);
          }
        });
      }
      else {
        this.entityService.add(this.entity).subscribe({
          next: res => {
            this.isUpdated.emit(true);
            this.activeModal.close(true);
            this.toastr.success(`Contract updated succsessfuly.`);
          },
          error: err => {
            this.toastr.error(`Something went wrong!`);
          }
        });
      }
    }
  }

  initForm(entity?: Contract): void {
    this.entityFrm = this.fromBuilder.group({
      numContract: [{ value: entity?.numContract, disabled: true }, Validators.required],
      startDate: [entity?.startDate, Validators.required],
      endDate: [entity?.endDate, [Validators.required]],
      type: [entity?.type, Validators.required]
    });
    this.client_id = entity?.client?.id;
  }

  closeModal(): void {
    this.activeModal.close();
  }

  getClients(): void {
    this.clientService.getAll().subscribe({
      next: res => {
        this.clients = res;
      },
      error: err => {
        this.toastr.error('Something went wrong!');
      }
    });
  }

  getClient(client_id?: number): Client {
    return this.clients.filter(cl => cl.id == client_id)[0];
  }

  getImageUrl(logo: string): string {
    return `${environment.apiUrl}file/find/${logo}`;
  }

  getClientLogo(client_id?: number): string | undefined {
    let logo = this.getClient(client_id)?.logo;
    return logo ? this.getImageUrl(logo) : undefined;
  }

}
