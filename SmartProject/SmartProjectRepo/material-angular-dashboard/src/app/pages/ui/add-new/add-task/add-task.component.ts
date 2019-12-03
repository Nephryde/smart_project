import { Component, OnInit, HostBinding } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskType } from 'app/models/task/task-type.model';
import { TaskService } from 'app/services/task.service';
import { TaskPriority } from 'app/models/task/task-priority.model';
import { User } from 'app/models/user.model';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ProjectService } from 'app/services/project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @HostBinding('class.employer-form') private readonly employerForm = true;
  myForm: FormGroup;
  taskTypes: TaskType[];
  taskPriorities: TaskPriority[];
  projectManagers: User[];
  filteredOptions: Observable<User[]>;
  userToPass: User;
  estimatedOn: boolean = false;
  releaseId: number;
  releaseName: string;
  myDate = new Date();

  constructor(private taskService: TaskService, private projectService: ProjectService, private fb: FormBuilder, private toastr: ToastrService) { 
  }

  async ngOnInit() {
    

    this.releaseId = parseInt(sessionStorage.getItem('releaseId'));
    this.releaseName = sessionStorage.getItem('releaseName');
    this.initForm();
    this.taskService.getTaskPriorities().subscribe((res:any) => {
      this.taskPriorities = res;
      console.log(this.taskPriorities);
    });
    this.taskService.getTaskTypes().subscribe((res:any) => {
      this.taskTypes = res;
      console.log(this.taskTypes);
    });

    this.projectManagers = await this.getProjectManagersData();
    this.filteredOptions = this.myForm.controls['UserAssigned'].valueChanges
    .pipe(
      startWith<string | User>(''),
      map(value => typeof value === 'string' ? value : value.fullName),
      map(name => name ? this._filter(name) : this.projectManagers.slice())
    );
    
  }

  getProjectManagersData() : Promise<any> {
    return this.projectService.getProjectManagers().toPromise();
  }

  initForm() {
    this.myForm = this.fb.group({
      ReleaseId :[this.releaseId],
      DateClosed :[''],
      TypeId :['', Validators.required],
      PriorityId :['', Validators.required],
      Name :['', Validators.required],
      UserAssigned :['', Validators.required],
      EstimatedTime :[''],
      Description :['']
    });
  }

  addNewTask() {
    console.log(this.myForm);
    this.userToPass = this.projectManagers.find(x => x.id === this.myForm.controls['UserAssigned'].value);
    
    this.taskService.postTask(this.myForm, this.userToPass).subscribe(
      (res:any) => {
        console.log(res);
        if(res){
          this.myForm.reset();
          this.toastr.success('Projekt został pomyślnie dodany.', 'Sukces', );
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

  estimatedOnOff() {
    if(this.estimatedOn)
      this.estimatedOn = false;
    else if(!this.estimatedOn)
      this.estimatedOn = true;

    this.myForm.controls['EstimatedTime'].reset();
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
