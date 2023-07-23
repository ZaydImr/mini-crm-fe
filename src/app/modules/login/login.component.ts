import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from 'src/app/models/User';
import { JwtResponse } from 'src/app/models/JwtResponse';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, NgbAlertModule, NgIf, RouterModule]
})
export class LoginComponent implements OnInit {

  errMessage: string = '';
  loadingLogin: boolean = false;

  loginForm: FormGroup = new FormGroup({
    'username': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  constructor(private userService: UserService, private router: Router, private tokenService: TokenStorageService) { }

  ngOnInit(): void {

  }

  login(): void {
    this.errMessage = '';

    if (this.loginForm.invalid) {
      if (this.loginForm.controls['username'].errors?.['required'])
        this.errMessage = 'The username is required!';
      else if (this.loginForm.controls['password'].errors?.['required'])
        this.errMessage = 'The password is required!';
      else if (this.loginForm.controls['username'].errors?.['minlength'])
        this.errMessage = 'The username have to be long!';
      else if (this.loginForm.controls['password'].errors?.['minlength'])
        this.errMessage = 'The password have to be long!';
      return;
    }

    this.loadingLogin = true;

    this.userService.login(this.loginForm.value['username'], this.loginForm.value['password']).subscribe({
      next: (res: JwtResponse) => {
        this.tokenService.saveUser(res);
        this.tokenService.saveToken(res.accessToken);
        this.router.navigate(['/dashboard']);
        this.loadingLogin = false;
      },
      error: (err: any) => {
        this.loadingLogin = false;

        if (err.status == 0) {
          this.errMessage = "Something wrong with server !";
          return;
        }

        if (err.error)
          this.errMessage = err.error;
      }
    });
  }

}
