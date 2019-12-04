import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Project } from 'app/models/project/project.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from 'app/models/user.model';

@Injectable()
export class ProjectService {
  public projectModel = new Project();

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  getProjects() {
    return this.http.get(environment.apiBaseUrl + '/Project');
  }

  getProjectReleases = (projectId: number) =>
    this.http.get(environment.apiBaseUrl + '/Project/Releases/' + projectId);

  getReleaseTasks = (releaseId: number) =>
    this.http.get(environment.apiBaseUrl + '/Task/ReleaseTasks/' + releaseId);

  getProjectManagers() {
    return this.http.get(environment.apiBaseUrl + '/Project/GetProjectManagers');
  }

  getProjectInfo = (projectId: number) =>
    this.http.get(environment.apiBaseUrl + '/Project/GetProjectInfo/' + projectId);

  getProjectRoles() {
    return this.http.get(environment.apiBaseUrl + '/Project/GetProjectRoles');
  }

  getProjectUsers = (projectId: number) =>
    this.http.get(environment.apiBaseUrl + '/Project/GetProjectUsers/' + projectId);

  addProject(form: FormGroup, prManager: User) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var body = {
      Name: form.value.Name,
      ProjectManager: prManager,
    };
    console.log(body);

    return this.http.post(environment.apiBaseUrl + '/Project/AddNewProject', body);
  }

  addRelease(form: FormGroup) {
    this.projectModel.Id = form.value.ProjectId;

    var body = {
      Name: form.value.Name,
      Project: this.projectModel,
      DeadlineDate: form.value.DeadlineDate === '' ? null : form.value.DeadlineDate,
    }

    return this.http.post(environment.apiBaseUrl + '/Project/AddNewRelease', body);
  }

  getProjectsHeaders() {
    return [
      {
        name: '#',
        sort: null,
      },
      {
        name: 'Nazwa',
        sort: 0,
      },
      {
        name: 'Menadżer projektu',
        sort: 0,
      },
      {
        name: 'Status',
        sort: 0,
      },
      {
        name: 'Data dodania',
        sort: 0,
      },
      {
        name: 'Działanie',
        sort: null,
      },
      {
        name: 'Wersje',
        sort: null,
      },
    ];
  }

  getReleasesHeaders() {
    return [
      'Wersja',
      'Data zamknięcia',
      'Zgłoszenia',
      'Zgłoszenia otwarte',
      'Postęp',
      'Przejdź do zgłoszeń',
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

  mapToArray(item) {
    let array = [];

    for (const key of Object.keys(item)) {
      if (item[key] == null)
        item[key] = "";
      if (typeof item[key] === 'object') {
        array.push(this.mapToArray(item[key]))
      }
      else {
        array.push(item[key]);
      }
    }
    return array;
  }
}