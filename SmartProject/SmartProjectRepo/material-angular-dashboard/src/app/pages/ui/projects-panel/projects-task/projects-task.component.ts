import { Component, OnInit, Output, EventEmitter, Input, HostBinding } from '@angular/core';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-projects-task',
  templateUrl: './projects-task.component.html',
  styleUrls: ['./projects-task.component.scss']
})
export class ProjectsTaskComponent implements OnInit {
  releaseTasks = [];
  advancedTable = [];
  public numPage;
  @Input() releaseId: number;
  @Output() visibleComponent = new EventEmitter<boolean>();
  public headers = this.projectService.getReleaseTasksHeaders();

  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-cell') private readonly mdlCell = true;
  @HostBinding('class.mdl-cell--12-col-desktop') private readonly mdlCell12ColDesktop = true;
  @HostBinding('class.mdl-cell--12-col-tablet') private readonly mdlCell12ColTablet = true;
  @HostBinding('class.mdl-cell--4-col-phone') private readonly mdlCell4ColPhone = true;
  @HostBinding('class.mdl-cell--top') private readonly mdlCellTop = true;
  @HostBinding('class.ui-tables') private readonly uiTables = true;
  
  constructor(private projectService: ProjectService) { }

  async ngOnInit() {
    this.releaseTasks = await this.getReleaseTasksData(this.releaseId);
    this.releaseTasks = this.projectService.mapToArray(this.releaseTasks);
    this.advancedTable = this.getAdvancedTablePage(1, this.countPerPage);
    this.numPage = this.getAdvancedTableNumOfPage(this.countPerPage);
    console.log(this.advancedTable);
  }

  getReleaseTasksData(releaseId: number) : Promise<any> {
    return this.projectService.getReleaseTasks(releaseId).toPromise();
  }

  slideToProjects() {
    this.visibleComponent.emit(true);
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
      this.advancedTable = this.getAdvancedTablePage(page, this.countPerPage);
    }
  }


  /* available sort value:
	-1 - desc; 	0 - no sorting; 1 - asc; null - disabled */
  public changeSorting(header, index) {
    const current = header.sort;
    if (current !== null) {
      this.headers.forEach((cell) => {
        cell.sort = (cell.sort !== null) ? 0 : null;
      });
      header.sort = (current === 1) ? -1 : 1;
      this.changeAdvanceSorting(header.sort, index);
      this.changePage(1, true);
    }
  }

  public getAdvancedTableNumOfPage(countPerPage) {
    console.log(this.advancedTable)
    return Math.ceil(this.releaseTasks.length / countPerPage);
  }

  public getAdvancedTablePage(page, countPerPage) {
    return this.releaseTasks.slice((page - 1) * countPerPage, page * countPerPage);
  }

  public changeAdvanceSorting(order, index) {
    this.releaseTasks = this.sorting(this.releaseTasks, order, index);
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
