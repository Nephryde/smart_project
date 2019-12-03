import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'environments/environment';
import { Project } from 'app/models/project/project.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from 'app/models/user.model';
import { TaskActivity } from 'app/models/task/task-activity.model';
import { TaskType } from 'app/models/task/task-type.model';
import { TaskPriority } from 'app/models/task/task-priority.model';
import { Release } from 'app/models/release/release.model';

@Injectable()
export class TaskService{
    public activityModel: TaskActivity;
    public taskType = new TaskType();
    public taskPriority = new TaskPriority();
    public releaseModel = new Release();

    constructor(private http: HttpClient, private fb: FormBuilder) { }

    getTaskById = (id: number) => 
        this.http.get(environment.apiBaseUrl + '/Task/Task/' + id);
        
    getTaskComments = (taskId: number) =>
        this.http.get(environment.apiBaseUrl + '/Task/GetTaskComments/' + taskId);

    getReleaseTasks = (releaseId: number) =>
        this.http.get(environment.apiBaseUrl + '/Task/ReleaseTasks/' + releaseId);

    getActivities() {
        return this.http.get(environment.apiBaseUrl + '/Task/Activities');
    }

    getTaskTypes() {
        return this.http.get(environment.apiBaseUrl + '/Task/TaskTypes');
    }

    getTaskPriorities() {
        return this.http.get(environment.apiBaseUrl + '/Task/TaskPriorities');
    }

    getTaskStatuses() {
        return this.http.get(environment.apiBaseUrl + '/Task/TaskStatuses');
    }

    postTask(form: FormGroup, usrAssigned: User) {
        this.taskType.id = form.value.TypeId;
        this.taskPriority.id =  form.value.PriorityId;
        this.releaseModel.id = form.value.ReleaseId;

        var body = {
            Title: form.value.Name,
            UserAssigned: usrAssigned,
            EstimatedTime: form.value.EstimatedTime === '' ? null : form.value.EstimatedTime,
            DeadlineDate: form.value.DateClosed === '' ? null : form.value.DateClosed,
            Type: this.taskType,
            Priority: this.taskPriority,
            Release: this.releaseModel,
            Description: form.value.Description === '' ? null : form.value.Description
        }
        console.log(body);

        return this.http.post(environment.apiBaseUrl + '/Task/AddNewTask', body);
    }

    postLogWork(form: FormGroup){
        this.activityModel = new TaskActivity();
        this.activityModel.id = form.value.Activity;

        var body = {
            TaskId: form.value.TaskId,
            Date: form.value.Date,
            LoggedTime: form.value.LoggedTime,
            WorkActivity: this.activityModel,
            Comment: form.value.Comment
        };
        console.log(body);

        return this.http.post(environment.apiBaseUrl + '/UserProfile/LogWork', body);
    }    

    public getTaskStatusFilter(){
        return [
            {
                value: 1,
                name: 'Nowy'
            },
            {
                value: 2,
                name: 'W Toku'
            },
            {
                value: 3,
                name: 'Analiza'
            },
            {
                value: 4,
                name: 'Programowanie'
            },
            {
                value: 5,
                name: 'Testy developerskie'
            },
            {
                value: 6,
                name: 'Testy'
            },
            {
                value: 7,
                name: 'Zamknięty'
            },
        ]
    }

    public getTaskPriorityFilter(){
        return [
            {
                value: 1,
                name: 'Bardzo niski'
            },
            {
                value: 2,
                name: 'Niski'
            },
            {
                value: 3,
                name: 'Normalny'
            },
            {
                value: 4,
                name: 'Wysoki'
            },
            {
                value: 5,
                name: 'Pilny'
            },
            {
                value: 6,
                name: 'Natychmiastowy'
            },
            {
                value: 7,
                name: 'Krytyczny'
            },
        ]
    }

    public getTaskTypeFilter() {
        return [
            {
                value: 1,
                name: 'Zadanie'
            },
            {
                value: 2,
                name: 'Modyfikacja'
            },
        ]
    }

    public getReleaseTasksHeaders() {
        return [
            {
            name: '#',
            sort: null,
            },
            {
            name: 'Tytuł',
            sort: 0,
            },
            {
            name: 'Przypisany do',
            sort: 0,
            },
            {
            name: 'Typ zagadnienia',
            sort: 0,
            },
            {
            name: 'Priorytet',
            sort: 0,
            },
            {
            name: 'Data dodania',
            sort: null,
            },
            {
            name: 'Data oddania',
            sort: null,
            },
            {
            name: 'Status',
            sort: 0,
            },
            {
            name: 'Progres',
            sort: 0,
            }
    
        ];
        }

    mapToArray(item){
        let array = [];
    
        for(const key of Object.keys(item)){
            if(item[key] == null)
              item[key] = "";
            if(typeof item[key] === 'object') {
                array.push(this.mapToArray(item[key]))
            }
            else {
                  array.push(item[key]);
            }
        }
        return array;
    }
}