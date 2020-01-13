import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'app/services/task.service';
import { TaskActivity } from 'app/models/task/task-activity.model';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-time',
  templateUrl: './log-time.component.html',
  styleUrls: ['./log-time.component.scss']
})
export class LogTimeComponent implements OnInit {
  myForm: FormGroup;
  taskId: number;
  logTimeActivities: TaskActivity[];

  constructor(private route: Router, private fb: FormBuilder, private taskService: TaskService, private toastr: ToastrService) { }

  async ngOnInit() {
    const urlArr = this.route.url.split("/");
    this.taskId = Number(urlArr[4]);

    this.initForm();
    this.logTimeActivities = await this.getLogTimeActivities();
    console.log(this.logTimeActivities);
  }

  getLogTimeActivities() : Promise<any> {
    return this.taskService.getActivities().toPromise();
  }

  back() {
    this.route.navigate(['ui/task/' + this.taskId]);
  }

  logTime() {
    this.taskService.postLogWork(this.myForm).subscribe(
      (res:any) => {
        console.log(res);
        if(res){
          this.myForm.reset();
          this.toastr.success('Pomyślnie zalogowano czas.', 'Sukces', );
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

  initForm() {
    this.myForm = this.fb.group({
      TaskId :this.taskId,
      Date :['', Validators.required],
      LoggedTime :['', Validators.required],
      Activity :['', Validators.required],
      Comment :['']
    });
  }

}
