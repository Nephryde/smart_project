import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from 'app/models/user.model';
import { Project } from 'app/models/project/project.model';
import { ProjectService } from 'app/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  myForm: FormGroup;
  ProjectManager = new FormControl();
  filteredOptions: Observable<User[]>;
  project = new Project();
  selectedProjectManager = "";
  projectManagers: User[];
  roles: any[];
  userToPass: User;
  projectId: number;

  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-cell') private readonly mdlCell = true;
  @HostBinding('class.mdl-cell--12-col-desktop') private readonly mdlCell12ColDesktop = true;
  @HostBinding('class.mdl-cell--12-col-tablet') private readonly mdlCell12ColTablet = true;
  @HostBinding('class.mdl-cell--4-col-phone') private readonly mdlCell4ColPhone = true;
  @HostBinding('class.mdl-cell--top') private readonly mdlCellTop = true;

  constructor(public projectService: ProjectService, private toastr: ToastrService, private fb: FormBuilder, private route: Router) { }


  async ngOnInit() {
    const urlArr = this.route.url.split("/");
    this.projectId = Number(urlArr[3]);
    this.initForm();
    this.projectManagers = await this.getUsers();
    this.roles = await this.getRoles();
    console.log(this.roles);
    console.log(this.projectManagers);
    this.filteredOptions = this.myForm.controls['ProjectManager'].valueChanges
    .pipe(
      startWith<string | User>(''),
      map(value => typeof value === 'string' ? value : value.fullName),
      map(name => name ? this._filter(name) : this.projectManagers.slice())
    );
    console.log(this.filteredOptions);
  }

  getUsers() : Promise<any> {
    return this.projectService.getUsers(this.projectId).toPromise();
  }

  getRoles() : Promise<any> {
    return this.projectService.getRoles().toPromise();
  }

  addNewProjectUser() {
    console.log(this.myForm);
    this.userToPass = this.projectManagers.find(x => x.id === this.myForm.controls['ProjectManager'].value);

    this.projectService.addProjectUser(this.myForm, this.userToPass, this.projectId).subscribe(
      (res:any) => {
        console.log(res);
        if(res){
          this.myForm.reset();
          this.toastr.success('Członek został pomyślnie dodany.', 'Sukces', );
          window.location.reload();
        } else {
            console.log("błąd");
        }
      },
      err => {
        this.toastr.error('Niepowodzenie', 'Wystąpił błąd.');
        console.log(err);
      }
    );
  }

  initForm() {
    this.myForm = this.fb.group({
      ProjectManager :[''],
      RoleId :[''],
    });
  }

  displayFn(options: User[]): (id: number) => string | null {
    return (id: number) => { 
      const correspondingOption = Array.isArray(options) ? options.find(option => option.id === id) : null;
      return correspondingOption ? correspondingOption.fullName : '';
    }
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.projectManagers.filter(option => option.fullName.toLowerCase().indexOf(filterValue) === 0);
  }

}
