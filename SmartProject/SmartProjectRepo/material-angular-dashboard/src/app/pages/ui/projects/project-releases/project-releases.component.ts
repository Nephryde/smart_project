import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-project-releases',
  templateUrl: './project-releases.component.html',
  styleUrls: ['./project-releases.component.scss']
})
export class ProjectReleasesComponent implements OnChanges { 

  @Input() childProjectId: number;
  @Input() childProjectName: string;
  releases = [];
  public headers = this.projectService.getReleasesHeaders();

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
  }

  async ngOnChanges(changes: SimpleChanges) {
    this.releases = await this.getReleasesData();
    this.releases = this.projectService.mapToArray(this.releases);
  }

  getReleasesData() : Promise<any> {
    return this.projectService.getProjectReleases(this.childProjectId).toPromise();
  }

  checkReleasesCount() {
    console.log(this.releases.length)
    if(this.releases.length = 0)
      return false;
    else
      return true;
  }

}
