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
  loading: boolean = false;
  public error: string;

  constructor(private service:UserService,
              private router:Router,
              private toastr:ToastrService) {
    super();
  }

  ngOnInit() {
    if(localStorage.getItem('token') != null)
      this.router.navigateByUrl('/#/app/dashboard');
  }

  onSubmit(form:NgForm){
    this.loading = true;
    this.service.login(form.value).subscribe(
      (res:any) => {
        this.loading = false;
        localStorage.setItem('token', res.token);
        this.service.getUserId().subscribe(
          (res:any) => {
            localStorage.setItem('userId', res);
            console.log(sessionStorage);
          }
        )
        this.router.navigateByUrl('/#/app/dashboard');
      },
      err => {
        this.loading = false;
        if(err.status == 400)
          this.toastr.error('Niepoprawny login lub hasło.', 'Logowanie niepomyślne.');
        else
        this.toastr.error('Przepraszamy, usługa niedostępna.', 'Operacja niepomyślna.');
      }
    );   
  }
}
