import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'app/services/project.service';
import { Project } from 'app/models/project/project.model';

@Component({
  selector: 'app-project-manage',
  templateUrl: './project-manage.component.html',
  styleUrls: ['./project-manage.component.scss']
})
export class ProjectManageComponent implements OnInit {
  projectId: number;
  project: Project;
  loaded = false;
  showProjectUsers: boolean;
  constructor(private route: Router, private projectService: ProjectService) { }

  async ngOnInit() {
    const urlArr = this.route.url.split("/");
    this.projectId = Number(urlArr[3]);

    this.project = await this.getReleasesData(this.projectId);
    this.loaded = true;
    console.log(this.project);
  }

  getReleasesData(projectId: number) : Promise<any> {
    return this.projectService.getProjectInfo(projectId).toPromise();
  }

  redirectAddRelease(id: number) {
    this.route.navigate(['ui/add-release/', id]);
  }

  renderProjectUsers() {
    this.showProjectUsers = true;
  }

}
