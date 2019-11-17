import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class ProjectService{
    constructor(private http: HttpClient) { }

    getProjects(){
        return this.http.get(environment.apiBaseUrl + '/Project');
    }

    getProjectReleases = (projectId: number) =>
        this.http.get(environment.apiBaseUrl + '/Project/Releases/' + projectId);

    getReleaseTasks = (releaseId: number) =>
        this.http.get(environment.apiBaseUrl + '/Task/ReleaseTasks/' + releaseId);

    getProjectsHeaders() {
        return [
            'Projekt',
            'Project Owner',
            'Status',
        ];
    }

    getReleasesHeaders() {
        return [
            'Wersja',
            'Liczba zgłoszeń',
            'Data zamknięcia',
        ];
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