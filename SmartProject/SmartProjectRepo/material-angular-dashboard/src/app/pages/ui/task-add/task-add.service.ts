import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { TaskDetails } from "app/models/task/task-details.model";

@Injectable()
export class TaskAddService {

    constructor(private http: HttpClient) { }

    postTask(task: TaskDetails) {
        return this.http.post('api/Task/Add', task);
    }

}