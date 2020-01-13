import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TaskType } from 'app/models/task/task-type.model';
import { TaskPriority } from 'app/models/task/task-priority.model';
import { User } from 'app/models/user.model';
import { Observable } from 'rxjs';
import { TaskService } from 'app/services/task.service';
import { ProjectService } from 'app/services/project.service';
import { ToastrService } from 'ngx-toastr';
import { startWith, map } from 'rxjs/operators';
import { Task } from 'app/models/task/task.model';
import { Router } from '@angular/router';
import { TaskStatus } from 'app/models/task/task-status.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  @HostBinding('class.employer-form') private readonly employerForm = true;
  myForm: FormGroup;
  taskTypes: TaskType[];
  taskStatutes: TaskStatus[];
  taskPriorities: TaskPriority[];
  projectManagers: User[];
  filteredOptions: Observable<User[]>;
  userToPass: User;
  estimatedOn: boolean = false;
  releaseId: number;
  releaseName: string;
  myDate = new Date();
  task: Task;
  taskId: number;
  checked = true;
  
  constructor(private taskService: TaskService, private projectService: ProjectService, private fb: FormBuilder, private toastr: ToastrService, private route :Router) { }

  async ngOnInit() {
    const urlArr = this.route.url.split("/");
    this.taskId = Number(urlArr[3]);

    this.task = await this.getTaskInfo(this.taskId);
    console.log(this.task);

    this.initForm();

    this.taskService.getTaskPriorities().subscribe((res:any) => {
      this.taskPriorities = res;
      console.log(this.taskPriorities);
    });
    this.taskService.getTaskTypes().subscribe((res:any) => {
      this.taskTypes = res;
      console.log(this.taskTypes);
    });
    this.taskService.getTaskStatuses().subscribe((res:any) => {
      this.taskStatutes = res;
      console.log(this.taskStatutes);
    });

    this.projectManagers = await this.getProjectManagersData();
    this.filteredOptions = this.myForm.controls['UserAssigned'].valueChanges
    .pipe(
      startWith<string | User>(''),
      map(value => typeof value === 'string' ? value : value.fullName),
      map(name => name ? this._filter(name) : this.projectManagers.slice())
    );
  }

  getTaskInfo(taskId: number) : Promise<any> {
    return this.taskService.getTaskById(taskId).toPromise();
  }

  getProjectManagersData() : Promise<any> {
    return this.projectService.getProjectManagers().toPromise();
  }

  initForm() {
    this.myForm = this.fb.group({
      ReleaseId :[this.releaseId],
      DateClosed :[''],
      TypeId :['', Validators.required],
      StatusId :['', Validators.required],
      PriorityId :['', Validators.required],
      Name :['', Validators.required],
      UserAssigned :[''],
      EstimatedTime :[''],
      Description :['']
    });
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

  editTask() {
    console.log(this.myForm);
    this.userToPass = this.projectManagers.find(x => x.id === this.myForm.controls['UserAssigned'].value);
    
    this.taskService.putTask(this.myForm, this.userToPass, this.taskId).subscribe(
      (res:any) => {
        console.log(res);
        if(res){
          this.myForm.reset();
          this.toastr.success('Zgłoszenie zostało pomyślnie edytowane.', 'Sukces', );
          this.route.navigate(['ui/task/' + this.taskId]);
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

}
