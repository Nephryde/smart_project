import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { BlankLayoutCardComponent } from 'app/components/blank-layout-card';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  styleUrls: ['../../../components/blank-layout-card/blank-layout-card.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent extends BlankLayoutCardComponent implements OnInit {
  formModel={
    UserName: '',
    Password: '',
  };
  public error: string;

  constructor(private service:UserService,
              private router:Router,
              private toastr:ToastrService) {
    super();
  }

  ngOnInit() {
  }

  onSubmit(form:NgForm){
    this.service.login(form.value).subscribe(
      (res:any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/#/app/dashboard');
      },
      err => {
        if(err.status == 400)
          this.toastr.error('Niepoprawny login lub hasło.', 'Logowanie niepomyślne.');
        else
          console.log(err); 
      }
    );
  }
}
