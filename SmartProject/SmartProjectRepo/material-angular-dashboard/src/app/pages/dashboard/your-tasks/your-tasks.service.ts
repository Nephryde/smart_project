import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
        name: 'Status',
        sort: 0,
        },
        {
        name: 'Progres',
        sort: null,
        }

    ];
    }

}