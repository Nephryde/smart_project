import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { UserService } from 'app/services/user.service';

import { AuthService } from '@services/*';

import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';

@Component({
  selector: 'app-sign-up',
  styleUrls: ['../../../components/blank-layout-card/blank-layout-card.component.scss'],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent extends BlankLayoutCardComponent implements OnInit {

  public signupForm: FormGroup;
  private email;
  private password;
  private username;
  public emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  public error: string;

  constructor(public service: UserService,
              private toastr:ToastrService) {
    super();
  }
  
    ngOnInit() {
      this.service.formModel.reset();
    }

    onSubmit(){
      this.service.register().subscribe(
        (res:any) => {
          if(res.succeeded){
            this.service.formModel.reset();
            this.toastr.success('New user created!', 'Registration successful.');
          } else {
            res.errors.forEach(element => {
              switch (element.code) {
                case 'DuplicateUserName':
                  this.toastr.error('Username is already taken.', 'Registration failed.');
                  break;
              
                default:
                  this.toastr.error(element.description, 'Registration failed.');
                  break;
              }
            });
          }
        },
        err => {
          console.log(err);
        }
      );
    }
}
