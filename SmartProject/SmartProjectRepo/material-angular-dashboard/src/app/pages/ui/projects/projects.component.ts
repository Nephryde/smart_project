import { Component, OnInit, HostBinding } from '@angular/core';
import { ProjectService } from 'app/services/project.service';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, group, state } from '@angular/animations';

export interface PassToReleases {
  projectId: number;
  projectName: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})

export class ProjectsComponent implements OnInit {

  public readonly Array = Array;
  projects = [];
  projectsTable = [];
  renderRelease: boolean = false;
  passData: PassToReleases;
  public numPage;
  public projectHeaders = this.projectService.getProjectsHeaders();
  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-cell') private readonly mdlCell = true;
  @HostBinding('class.mdl-cell--12-col-desktop') private readonly mdlCell12ColDesktop = true;
  @HostBinding('class.mdl-cell--12-col-tablet') private readonly mdlCell12ColTablet = true;
  @HostBinding('class.mdl-cell--4-col-phone') private readonly mdlCell4ColPhone = true;
  @HostBinding('class.mdl-cell--top') private readonly mdlCellTop = true;
  @HostBinding('class.ui-tables') private readonly uiTables = true;

  constructor(private projectService: ProjectService, private route: Router) { 
    this.passData = { projectId: null, projectName: ''};
  }

  async ngOnInit() {
    this.projects = await this.getProjectsData();
    console.log(this.projects)
    this.projects = this.projectService.mapToArray(this.projects);
    this.projectsTable = this.getAdvancedTablePage(1, this.countPerPage);
    this.numPage = this.getAdvancedTableNumOfPage(this.countPerPage);
  }

  getProjectsData() : Promise<any> {
    return this.projectService.getProjects().toPromise();
  }

  addProjectRedirect() {
    this.route.navigate(['ui/add-project']);
  }

  renderReleases(projectId, index) {
    if(this.renderRelease == false) {
      this.passData.projectId = projectId;
      this.passData.projectName = this.projects[index][1];
      this.renderRelease = true;      
    }
    else {
      this.renderRelease = false;
      this.passData.projectId = projectId;
      this.passData.projectName = this.projects[index][1];
      setTimeout(() => this.renderRelease = true, 500);
    }
  }

  public readonly sortOrder = {
    asc: 1,
    desc: -1,
  };

  public currentPage = 1;
  private countPerPage = 4;

  public changePage(page, force = false) {
    if (page !== this.currentPage || force) {
      this.currentPage = page;
      this.projectsTable = this.getAdvancedTablePage(page, this.countPerPage);
    }
  }

  /* available sort value:
	-1 - desc; 	0 - no sorting; 1 - asc; null - disabled */
  public changeSorting(header, index) {
    const current = header.sort;
    if (current !== null) {
      this.projectHeaders.forEach((cell) => {
        cell.sort = (cell.sort !== null) ? 0 : null;
      });
      header.sort = (current === 1) ? -1 : 1;
      this.changeAdvanceSorting(header.sort, index);
      this.changePage(1, true);
    }
  }

  public getAdvancedTableNumOfPage(countPerPage) {
    console.log(this.projects)
    return Math.ceil(this.projects.length / countPerPage);
  }

  public getAdvancedTablePage(page, countPerPage) {
    return this.projects.slice((page - 1) * countPerPage, page * countPerPage);
  }

  public changeAdvanceSorting(order, index) {
    this.projects = this.sorting(this.projects, order, index);
  }

  private sorting(array, order, value) {
    const compareFunction = (a, b) => {
      if (a[value] > b[value]) {
        return 1 * order;
      }
      if (a[value] < b[value]) {
        return -1 * order;
      }
      return 0;
    };
    return array.sort(compareFunction);
  }

}
