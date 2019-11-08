import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class YourTasksService {

    constructor(private http : HttpClient ) { }

    getTasksList() {
        return this.http.get(environment.apiBaseUrl + '/Dashboard');
    }

    getCurrentUser() {
        return this.http.get(environment.apiBaseUrl + '/ApplicationUser/GetCurrentUser')
    }
    
    public getAdvancedHeaders() {
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
        name: 'Autor',
        sort: 0,
        },
        {
        name: 'Typ zagadnienia',
        sort: null,
        },
        {
        name: 'Priorytet',
        sort: null,
        },
        {
        name: 'Data dodania',
        sort: 0,
        },
        {
        name: 'Status',
        sort: null,
        },
        {
        name: 'Progres',
        sort: 0,
        }

    ];
    }

}