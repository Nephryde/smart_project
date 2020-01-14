import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { Task } from 'app/models/task/task.model';
import { TaskComment } from 'app/models/task/task-comment.model';
import { TaskDetails } from 'app/models/task/task-details.model';
import { TaskService } from 'app/services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  id: number;
  task: TaskDetails;
  taskComments: TaskComment[] = [];
  progress: number;
  loggedTime: any[] = [];
  sumTime: number;

  constructor(private taskService: TaskService, private route: Router) { }

  ngOnInit() {
    const urlArr = this.route.url.split("/");
    this.id = Number(urlArr[3]);

    this.taskService.getTaskById(this.id).subscribe((res:any) => {
      this.task = res;
      console.log(this.task) 
    });

    this.taskService.getTaskComments(this.id).subscribe((res:any) => {
      this.taskComments = res;
      console.log(this.taskComments);
    })

    this.taskService.getTaskLoggedTime(this.id).subscribe((res:any) => {
      this.loggedTime = res;
      console.log(this.loggedTime);
      this.sumTime = this.loggedTime.reduce(function(prev, cur) {
        return prev + cur.time;
      }, 0);
      console.log(this.sumTime);
    })
  }

  redirectLogWork() {
    this.route.navigate(['ui/task/log-time/', this.id]);
  }

  redirectEditTask() {
    this.route.navigate(['ui/edit-task/', this.id]);
  }

}
