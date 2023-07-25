import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/models/Client';
import { AddEditClientService } from 'src/app/services/add-edit-client.service';

@Component({
  standalone: false,
  selector: 'app-add-edit-client',
  templateUrl: './add-edit.component.html'
})
export class AddEditClientComponent {

  clientForm: FormGroup = new FormGroup({
    'firstname': new FormControl(this.addEditService.client?.firstName, [Validators.required]),
    'lastname': new FormControl(this.addEditService.client?.lastName, [Validators.required]),
    'email': new FormControl(this.addEditService.client?.email, [Validators.required]),
    'phoneNumber': new FormControl(this.addEditService.client?.phoneNumber, [Validators.required]),
    'address': new FormControl(this.addEditService.client?.address, [Validators.required]),
    'ice': new FormControl(this.addEditService.client?.ICE, [Validators.required]),
  });

  constructor(public addEditService: AddEditClientService) { }

  saveClient(): void {
    debugger
    
    this.addEditService.client = {
      email: this.clientForm.controls['email'].value,
      firstName: this.clientForm.controls['firstname'].value,
      lastName: this.clientForm.controls['lastname'].value,
      phoneNumber: this.clientForm.controls['phoneNumber'].value,
      address: this.clientForm.controls['address'].value,
      ICE: this.clientForm.controls['ice'].value,
    };
    this.addEditService.save();

  }

  closeModal(): void {
    document.getElementById('add-edit-client')?.classList.remove('show-modal');
  }

}
