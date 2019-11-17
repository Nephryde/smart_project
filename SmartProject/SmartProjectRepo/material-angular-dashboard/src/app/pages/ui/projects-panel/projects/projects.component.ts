import { Component, OnInit, HostBinding, Input, EventEmitter, Output } from '@angular/core';
import { ProjectService } from 'app/services/project.service';
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class ProjectsComponent implements OnInit {
  public readonly Array = Array;
  projects = [];
  releases = [];
  projectName: string;
  public headers = this.projectService.getProjectsHeaders();
  render: boolean = false;
  visible: boolean = true;
  @Output() releaseId = new EventEmitter<number>();
  @Output() visibleComponent = new EventEmitter<boolean>();

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

  getReleasesData(projectId: number) : Promise<any> {
    return this.projectService.getProjectReleases(projectId).toPromise();
  }

  slideToTasks(releaseId: number) {
    this.releaseId.emit(releaseId);
    this.visibleComponent.emit(false);
  }

  async renderReleases(projectId, index) {
    this.visible = false;
    this.releases = await this.getReleasesData(projectId);
    this.releases = this.projectService.mapToArray(this.releases);
    this.projectName = this.projects[index][1];
    this.render = true;
    this.visible = true;
  }

}
