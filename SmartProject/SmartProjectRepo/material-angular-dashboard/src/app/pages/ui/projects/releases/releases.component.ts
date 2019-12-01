import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { PassToReleases } from '../projects.component';
import { ProjectService } from 'app/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.scss']
})
export class ReleasesComponent implements OnInit {
  @HostBinding('class.releases-table') private readonly projectsTable = true;
  @Input() retreivedData: PassToReleases;
  releases: Object[] = [];
  public releaseHeaders = this.projectService.getReleasesHeaders();
  progress: number;

  constructor(private projectService: ProjectService, private router: Router) { }

  async ngOnInit() {
    this.releases = await this.getReleasesData(this.retreivedData.projectId);
    console.log(this.releases)
  }

  getReleasesData(projectId: number) : Promise<any> {
    return this.projectService.getProjectReleases(projectId).toPromise();
  }

  goToTasks(releaseId: number) {
    this.router.navigate(['ui/tasks/', releaseId]);
  }

}
