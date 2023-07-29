import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators, FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Client } from 'src/app/models/Client';
import { ToastrService } from 'ngx-toastr';
import { Affair } from 'src/app/models/Affair';
import { ClientService } from 'src/app/services/client.service';
import { AffaiService } from 'src/app/services/affair.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from 'src/app/models/User';
import { JwtResponse } from 'src/app/models/JwtResponse';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-update-affair',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-edit-affair.component.html'
})
export class AddEditAffairComponent implements OnInit {

  @Input() public affair_id!: number;
  @Output() public isUpdated: EventEmitter<any> = new EventEmitter();

  entity?: Affair;
  client_id?: number;
  clients: Client[] = [];
  errMessage?: string;
  entityFrm: UntypedFormGroup = this.fromBuilder.group({
    title: [null, Validators.required],
    object: [null, [Validators.required]],
    type: [null, Validators.required]
  });

  constructor(
    private activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private tokenService: TokenStorageService,
    private clientService: ClientService,
    private entityService: AffaiService,
    private fromBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    if (this.affair_id) {
      this.entityService.getById(this.affair_id).subscribe({
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

  updateAffair(): void {
    this.errMessage = '';
    if (this.entityFrm.invalid || !this.client_id) {
      this.errMessage = 'Fill the form !';
    }
    else {
      this.entity = {
        title: this.entityFrm.value.title,
        object: this.entityFrm.value.object,
        type: this.entityFrm.value.type,
        user: {
          username: (this.tokenService.getUser() as JwtResponse).username
        },
        client: this.getClient(this.client_id as number),
      };

      if (this.affair_id) {
        if (this.entity) {
          this.entity.id = this.affair_id;
          this.entityService.update(this.entity).subscribe({
            next: res => {
              this.isUpdated.emit(true);
              this.activeModal.close(true);
              this.toastr.success(`Affair updated succsessfuly.`);
            },
            error: err => {
              this.toastr.error(`Something went wrong!`);
            }
          });
        }
      }
      else {
        this.entityService.add(this.entity).subscribe({
          next: res => {
            this.isUpdated.emit(true);
            this.activeModal.close(true);
            this.toastr.success(`Affair updated succsessfuly.`);
          },
          error: err => {
            this.toastr.error(`Something went wrong!`);
          }
        });
      }
    }
  }

  initForm(entity?: Affair): void {
    this.entityFrm = this.fromBuilder.group({
      title: [entity?.title, Validators.required],
      object: [entity?.object, [Validators.required]],
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
