import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { FormControl, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Project } from 'app/models/project/project.model';
import { ProjectService } from 'app/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'app/models/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  myForm: FormGroup;
  ProjectManager = new FormControl();
  filteredOptions: Observable<User[]>;
  project = new Project();
  selectedProjectManager = "";
  projectManagers: User[];
  userToPass: User;

  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-cell') private readonly mdlCell = true;
  @HostBinding('class.mdl-cell--12-col-desktop') private readonly mdlCell12ColDesktop = true;
  @HostBinding('class.mdl-cell--12-col-tablet') private readonly mdlCell12ColTablet = true;
  @HostBinding('class.mdl-cell--4-col-phone') private readonly mdlCell4ColPhone = true;
  @HostBinding('class.mdl-cell--top') private readonly mdlCellTop = true;

  constructor(public projectService: ProjectService, private toastr: ToastrService, private fb: FormBuilder, private location: Location) { }

  async ngOnInit() {
    this.initForm();
    this.projectManagers = await this.getProjectManagersData();
    console.log(this.projectManagers);
    this.filteredOptions = this.myForm.controls['ProjectManager'].valueChanges
    .pipe(
      startWith<string | User>(''),
      map(value => typeof value === 'string' ? value : value.fullName),
      map(name => name ? this._filter(name) : this.projectManagers.slice())
    );
  }

  getProjectManagersData() : Promise<any> {
    return this.projectService.getProjectManagers().toPromise();
  }

  addNewProject() {
    this.userToPass = this.projectManagers.find(x => x.id === this.myForm.controls['ProjectManager'].value);

    this.projectService.addProject(this.myForm, this.userToPass).subscribe(
      (res:any) => {
        console.log(res);
        if(res){
          this.myForm.reset();
          this.toastr.success('Projekt został pomyślnie dodany.', 'Sukces', );
          this.location.back();
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
      Name :['', Validators.required],
      ProjectManager :[''],
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
