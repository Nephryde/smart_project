import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@services/*';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
})
export class CommonLayoutComponent implements OnInit {

  public user;

  constructor(private userService: UserService,
              private router: Router) {}

  public ngOnInit() {
    this.userService.getUserInfo().subscribe((res:any) => {
      this.user = res;
    })
    console.log(this.user);
  }

  public onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/pages/login'])
  }
}
