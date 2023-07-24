import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';
import { UntypedFormGroup, ReactiveFormsModule, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent {
  addReactiveForm : UntypedFormGroup = this.fromBuilder.group({
    firstName: [""],
    lastName: [""],
    email: [""],
    phoneNumber: [""],
    address: [""],
    ICE: [""],
    logo: [""],
  })

  @Input() public client_id: number;
  @Output() public isUpdated : EventEmitter<any> = new EventEmitter();
  client: Client;

  constructor(private activeModal: NgbActiveModal,private clientService : ClientService, private fromBuilder: UntypedFormBuilder){}

  ngOnInit(){
    this.clientService.getClientById(this.client_id).subscribe({
      next : res => {
        this.client = res;
        this.addReactiveForm = this.fromBuilder.group({
          firstName: [res.firstName],
          lastName: [res.lastName],
          email: [res.email],
          phoneNumber: [res.phoneNumber],
          address: [res.address],
          ICE: [res.ICE],
          logo: [res.logo],
        });
      }
    })

  }

  updateClient(){
    this.clientService.updateClient({
      id: this.client.id, 
      firstName: this.addReactiveForm.value.firstName,
      lastName: this.addReactiveForm.value.lastName,
      email: this.addReactiveForm.value.email,
      phoneNumber: this.addReactiveForm.value.phoneNumber,
      address: this.addReactiveForm.value.address,
      ICE: this.addReactiveForm.value.ICE,
      logo: this.addReactiveForm.value.logo,
    }).subscribe({
      next : res => {
        this.isUpdated.emit(true);
        this.activeModal.close(true);
        console.log(res);
        
      }
    })
  }

  closeModal(){
    this.activeModal.close();
  }

}
