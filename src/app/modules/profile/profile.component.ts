import { Component } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { UploaderService } from 'src/app/services/uploader.service';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { JwtResponse } from 'src/app/models/JwtResponse';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProfileComponent {

  state: any;
  image!: File;
  baseUrl: string = environment.apiUrl + 'file/find/';
  msg = "";
  public currentUser?: User;
  public showPassword?: boolean;
  public showPasswordOnPress?: boolean;
  public imageUrl!: string;
  public imageChanged = false;
  public formSubmited = false;
  public userForm!: UntypedFormGroup;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService, private formBuilder: UntypedFormBuilder, private toastr: ToastrService, private uploaderService: UploaderService) {
    this.initForm();
    this.getUser();
  }

  updateUser(): void {
    this.formSubmited = true;

    if (this.userForm.valid) {
      if (this.currentUser) {
        this.currentUser.firstName = this.userForm.value.firstName;
        this.currentUser.lastName = this.userForm.value.lastName;
        this.currentUser.email = this.userForm.value.email;
        this.currentUser.phoneNumber = this.userForm.value.phoneNumber;
      }

      if (this.userForm.value.password && this.currentUser) {
        this.currentUser.password = this.userForm.value.password;
      }

      if (this.imageChanged) {
        if (this.image) {
          this.uploaderService.upload(this.image).subscribe(
            res => {
              if (this.currentUser) {
                let user: JwtResponse = this.tokenStorage.getUser() as JwtResponse;
                user.picture = res.message;
                this.tokenStorage.saveUser(user);

                this.currentUser.picture = res.message;
                this.imageUrl = this.baseUrl + res.message;
                this.userService.update(this.currentUser as User).subscribe(
                  () => {
                    this.getUser();
                    this.toastr.success('Picture updated successfuly');
                    this.formSubmited = false;
                    this.imageChanged = false;
                    this.userForm.controls['password'].reset();
                  }
                );
              }
            },
            () => {
              this.toastr.error('The picture can\'t be uploaded !!');
              this.formSubmited = false;
              this.imageChanged = false;
            }
          );
        }
        else {
          this.userService.update(this.currentUser as User).subscribe({
            next: res => {
              this.getUser();
              this.toastr.success('Picture updated successfuly');
              this.formSubmited = false;
              this.imageChanged = false;
              this.userForm.controls['password'].reset();
            },
            error: err => {
              this.toastr.error('The picture can\'t be uploaded !!');
              this.formSubmited = false;
              this.imageChanged = false;
            }
          });

        }
      }
      else {
        this.userService.update(this.currentUser as User).subscribe({
          next: res => {
            this.toastr.success('Profile updated successfuly');
            this.formSubmited = false;
            this.userForm.controls['password'].reset();
          },
          error: err => {
            this.toastr.error('Can\'t update the profile !!');
            this.formSubmited = false;
          }
        });
      }

    }
    else {
      this.formSubmited = false;
      this.toastr.error('Fill the required blanks !!');
    }
  }

  deletePicture(): void {

  }

  selectFile(event: any): void {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = "<i class='fa fa-exclamation-triangle'></i> You must select an image";
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "<i class='fa fa-exclamation-triangle'></i> Only images are supported";
      return;
    }

    var reader = new FileReader();
    this.image = event.target.files[0];
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.imageUrl = reader.result as string;
      this.imageChanged = true;
    }
  }

  initForm(user?: User): void {
    this.userForm = this.formBuilder.group({
      'username': [user?.username, Validators.required],
      'password': [null],
      'email': [user?.email, [Validators.required, Validators.email]],
      'firstName': [user?.firstName, Validators.required],
      'lastName': [user?.lastName, Validators.required],
      'phoneNumber': [user?.phoneNumber, [Validators.required]],
      'picture': [user?.picture]
    });
  }

  getUser(): void {
    this.userService.getByUsername(this.tokenStorage.getUser()?.username as string).subscribe({
      next: res => {
        this.currentUser = res;
        this.imageUrl = res.picture ? this.baseUrl + res.picture : '';
        this.initForm(res);
      },
      error: err => {
        this.toastr.error(err.error);
      }
    });
  }

}
