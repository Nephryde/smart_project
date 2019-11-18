import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'
import { ProjectService } from 'app/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-panel',
  templateUrl: './projects-panel.component.html',
  styleUrls: ['./projects-panel.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})

export class ProjectsPanelComponent implements OnInit {
  public readonly Array = Array;
  projects = [];
  releases = [];
  tasks = [];
  tasksTable = [];
  projectName: string;
  releaseName: string;
  public numPage;
  public releaseHeaders = this.projectService.getReleasesHeaders();
  public tasksHeaders = this.projectService.getReleaseTasksHeaders();
  public projectHeaders = this.projectService.getProjectsHeaders();
  renderRelease: boolean = false; 
  renderTask: boolean = false;
  visibleProject: boolean = true;
  visibleRelease: boolean = false;
  visibleTask: boolean = false;

  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-cell') private readonly mdlCell = true;
  @HostBinding('class.mdl-cell--12-col-desktop') private readonly mdlCell12ColDesktop = true;
  @HostBinding('class.mdl-cell--12-col-tablet') private readonly mdlCell12ColTablet = true;
  @HostBinding('class.mdl-cell--4-col-phone') private readonly mdlCell4ColPhone = true;
  @HostBinding('class.mdl-cell--top') private readonly mdlCellTop = true;
  @HostBinding('class.ui-tables') private readonly uiTables = true;


  constructor(private projectService: ProjectService, private route: Router) { }

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

  addProjectRedirect() {
    this.route.navigate(['ui/add-project']);
  }

  async renderReleases(projectId, index) {
    this.visibleRelease = false;
    this.releases = await this.getReleasesData(projectId);
    this.releases = this.projectService.mapToArray(this.releases);
    this.projectName = this.projects[index][1];
    this.visibleRelease = true;
    console.log(this.releases);
  }

  async renderTasks(releaseId, index) {
    this.tasks = await this.getReleaseTasksData(releaseId);
    this.tasks = this.projectService.mapToArray(this.tasks);
    this.releaseName = this.releases[index][0];
    this.tasksTable = this.getAdvancedTablePage(1, this.countPerPage);
    this.numPage = this.getAdvancedTableNumOfPage(this.countPerPage);
    
    this.visibleTask = true;
    this.visibleProject = false;
    this.visibleRelease = false;
    console.log(this.tasksTable);
  }

  getReleaseTasksData(releaseId: number) : Promise<any> {
    return this.projectService.getReleaseTasks(releaseId).toPromise();
  }

  slideToProjects() {
    this.visibleProject = true;
    this.visibleRelease = true;
    this.visibleTask = false;
  }

  public readonly sortOrder = {
    asc: 1,
    desc: -1,
  };

  public genreColors = {
    'Zadanie': 'orange',
    'Modyfikacja': 'purple',
    'Błąd': 'dark-gray',
    'Hotfix': 'green',
    'Novel': 'teal',
    'Fantasy': 'red',
    'Adventure': 'light-blue',
  };

  public currentPage = 1;
  private countPerPage = 15;
  

  //public advancedTable = this.getAdvancedTablePage(1, this.countPerPage);

  public changePage(page, force = false) {
    if (page !== this.currentPage || force) {
      this.currentPage = page;
      this.tasksTable = this.getAdvancedTablePage(page, this.countPerPage);
    }
  }


  /* available sort value:
	-1 - desc; 	0 - no sorting; 1 - asc; null - disabled */
  public changeSorting(header, index) {
    const current = header.sort;
    if (current !== null) {
      this.tasksHeaders.forEach((cell) => {
        cell.sort = (cell.sort !== null) ? 0 : null;
      });
      header.sort = (current === 1) ? -1 : 1;
      this.changeAdvanceSorting(header.sort, index);
      this.changePage(1, true);
    }
  }

  public getAdvancedTableNumOfPage(countPerPage) {
    console.log(this.tasksTable)
    return Math.ceil(this.tasks.length / countPerPage);
  }

  public getAdvancedTablePage(page, countPerPage) {
    return this.tasks.slice((page - 1) * countPerPage, page * countPerPage);
  }

  public changeAdvanceSorting(order, index) {
    this.tasks = this.sorting(this.tasks, order, index);
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
