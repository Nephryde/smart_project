import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public readonly Array = Array;
  projects = [];
  public headers = this.projectService.getProjectsHeaders();
  @Input() parentProjectId: number;
  @Input() parentProjectName: string;
  render: boolean = false;

  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-cell') private readonly mdlCell = true;
  @HostBinding('class.mdl-cell--12-col-desktop') private readonly mdlCell12ColDesktop = true;
  @HostBinding('class.mdl-cell--12-col-tablet') private readonly mdlCell12ColTablet = true;
  @HostBinding('class.mdl-cell--4-col-phone') private readonly mdlCell4ColPhone = true;
  @HostBinding('class.mdl-cell--top') private readonly mdlCellTop = true;
  @HostBinding('class.ui-tables') private readonly uiTables = true;

  constructor(private projectService: ProjectService) { }

  async ngOnInit() {
    this.projects = await this.getProjectsData();
    this.projects = this.projectService.mapToArray(this.projects);
    console.log(this.projects);
  }

  getProjectsData() : Promise<any> {
    return this.projectService.getProjects().toPromise();
  }

  renderReleases(projectId, index) {
    console.log(this.projects)
    this.parentProjectId = projectId;
    this.parentProjectName = this.projects[index][1];
    this.render = true;
  }

}
