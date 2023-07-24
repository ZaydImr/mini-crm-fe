import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from 'src/app/services/client.service';
import { UntypedFormBuilder, UntypedFormGroup, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent {

  @Output() public isAdded : EventEmitter<any> = new EventEmitter();

  addReactiveForm: UntypedFormGroup = new UntypedFormGroup({
    firstName: new UntypedFormControl(''),
    lastName: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    phoneNumber: new UntypedFormControl(''),
    address: new UntypedFormControl(''),
    ICE: new UntypedFormControl(''),
    logo: new UntypedFormControl(''),
  });

  constructor(private activeModal: NgbActiveModal, private clientService: ClientService, private fromBuilder: UntypedFormBuilder) { }

  NgOnInit() {
    this.addReactiveForm = this.fromBuilder.group({
      firstName: [],
      lastName: [],
      email: [],
      phoneNumber: [],
      address: [],
      ICE: [],
      logo: [],
    })
  }

  addClient() {
    this.clientService.addClient({
      firstName: this.addReactiveForm.value.firstName,
      lastName: this.addReactiveForm.value.lastName,
      email: this.addReactiveForm.value.email,
      phoneNumber: this.addReactiveForm.value.phoneNumber,
      address: this.addReactiveForm.value.address,
      ICE: this.addReactiveForm.value.ICE,
      logo: this.addReactiveForm.value.logo,
    }).subscribe({
      next : res =>{
        this.isAdded.emit(true);
        this.activeModal.close(true);
        console.log(res);
      }
    })

  }

  closeModal() {
    this.activeModal.close();
  }


}
