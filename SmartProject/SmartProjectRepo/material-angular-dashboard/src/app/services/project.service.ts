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


    getProjectsHeaders() {
        return [
            '#',
            'Projekt',
            'Project Owner',
            'Status',
        ];
    }

    getReleasesHeaders() {
        return [
            'Wersja',
            'Project Owner',
            'Project Manager',
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