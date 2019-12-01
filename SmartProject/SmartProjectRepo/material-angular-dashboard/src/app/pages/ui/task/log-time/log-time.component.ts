import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'app/services/task.service';
import { TaskActivity } from 'app/models/task/task-activity.model';

@Component({
  selector: 'app-log-time',
  templateUrl: './log-time.component.html',
  styleUrls: ['./log-time.component.scss']
})
export class LogTimeComponent implements OnInit {
  myForm: FormGroup;
  taskId: number;
  logTimeActivities: TaskActivity[];

  constructor(private route: Router, private fb: FormBuilder, private taskService: TaskService) { }

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

  logTime() {
    console.log(this.myForm);
  }

  initForm() {
    this.myForm = this.fb.group({
      TaskId :[''],
      Date :['', Validators.required],
      Time :['', Validators.required],
      Activity :['', Validators.required],
      Comment :['']
    });
  }

}
