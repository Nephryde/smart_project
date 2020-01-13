import { Component, OnInit, HostBinding } from '@angular/core';
import { TaskService } from 'app/services/task.service';
import { Router } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
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
export class TasksComponent implements OnInit {

  public readonly Array = Array;
  releaseId: number;
  tasks = [];
  stableTasks = [];
  tasksTable = [];
  public numPage;
  public tasksHeaders = this.taskService.getReleaseTasksHeaders();
  selectedFilter: any;
  public taskTypeFilter = this.taskService.getTaskTypeFilter();
  public taskPriorityFilter = this.taskService.getTaskPriorityFilter();
  public taskStatusFilter = this.taskService.getTaskStatusFilter();
  filteredTable = [];
  public filtersVisible: boolean = false;

  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-cell') private readonly mdlCell = true;
  @HostBinding('class.mdl-cell--12-col-desktop') private readonly mdlCell12ColDesktop = true;
  @HostBinding('class.mdl-cell--12-col-tablet') private readonly mdlCell12ColTablet = true;
  @HostBinding('class.mdl-cell--4-col-phone') private readonly mdlCell4ColPhone = true;
  @HostBinding('class.mdl-cell--top') private readonly mdlCellTop = true;
  @HostBinding('class.ui-tables') private readonly uiTables = true;

  constructor(private taskService: TaskService, private route: Router) { }

  async ngOnInit() {
    const urlArr = this.route.url.split("/");
    this.releaseId = Number(urlArr[3]);
    this.tasks = await this.getData();
    this.tasks = this.taskService.mapToArray(this.tasks);
    this.stableTasks = this.tasks;
    console.log(this.tasks);
    this.tasksTable = this.getAdvancedTablePage(1, this.countPerPage);
    this.numPage = this.getAdvancedTableNumOfPage(this.countPerPage);
    console.log(this.tasksTable);
  }
  

  getData() : Promise<any> {
    return this.taskService.getReleaseTasks(this.releaseId).toPromise();
  }

  async filterTable(filter, filterType) {
    this.tasks = this.stableTasks;
    this.filteredTable = [];
    this.tasks.forEach(element => {
      if(element[filter] == filterType)
        this.filteredTable.push(element);
    });
    this.tasks = this.filteredTable;
    this.tasksTable = this.getAdvancedTablePage(1, this.countPerPage);
    this.numPage = this.getAdvancedTableNumOfPage(this.countPerPage);
    console.log(this.filteredTable);
  }

  expandFilters(visible){
    if(visible)
      this.filtersVisible = false;
    else if(!visible)
      this.filtersVisible = true;
  }

  goToTaskDetails(id:number){
    this.route.navigate(['ui/task/', id]);
  }

  addNewTask() {
    sessionStorage.setItem('releaseId', this.releaseId.toString());
    this.route.navigate(['ui/add-task']);
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
  private countPerPage = 10;
  

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
