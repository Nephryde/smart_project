import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class TaskService{
    constructor(private http: HttpClient) { }

    getTaskById = (id: number) => 
        this.http.get(environment.apiBaseUrl + '/Task/Task/' + id);
        
    getTaskComments = (taskId: number) =>
        this.http.get(environment.apiBaseUrl + '/Task/GetTaskComments/' + taskId);
}