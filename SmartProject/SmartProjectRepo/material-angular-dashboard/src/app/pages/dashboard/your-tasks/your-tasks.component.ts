import { Component, OnInit, HostBinding } from '@angular/core';
import { YourTasksService } from './your-tasks.service';
import {HttpClient} from '@angular/common/http';
import { environment } from 'environments/environment';
import { Task } from 'app/models/task/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-your-tasks',
  templateUrl: './your-tasks.component.html',
  styleUrls: ['./your-tasks.component.scss']
})
export class YourTasksComponent implements OnInit {
  public readonly Array = Array;
  advanceTableData = [];
  advancedTable = [];
  public numPage;

  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-cell') private readonly mdlCell = true;
  @HostBinding('class.mdl-cell--12-col-desktop') private readonly mdlCell12ColDesktop = true;
  @HostBinding('class.mdl-cell--12-col-tablet') private readonly mdlCell12ColTablet = true;
  @HostBinding('class.mdl-cell--4-col-phone') private readonly mdlCell4ColPhone = true;
  @HostBinding('class.mdl-cell--top') private readonly mdlCellTop = true;
  @HostBinding('class.ui-tables') private readonly uiTables = true;

  constructor(private yourTasksService : YourTasksService, private http : HttpClient, private route: Router) { }

  mapToArray(item){
    let array = [];

    for(const key of Object.keys(item)){
        if(item[key] == null)
          item[key] = "";
        if(typeof item[key] === 'object') {
            array.push(this.mapToArray(item[key]))
        }
        else {
              array.push(item[key]);
        }
    }
    return array;
}

  async ngOnInit() { 

    this.advanceTableData = await this.getData();
    this.advanceTableData = this.mapToArray(this.advanceTableData);
    console.log(this.advanceTableData);
    this.advancedTable = this.getAdvancedTablePage(1, this.countPerPage);
    this.numPage = this.getAdvancedTableNumOfPage(this.countPerPage);
    
  }

  getData() : Promise<any> {
    this.yourTasksService.getCurrentUser().subscribe(
      res => { console.log(res) },
      err => { console.log(err) },
    );
    return this.yourTasksService.getTasksList().toPromise();
  }

  goToTaskDetails(id:number){
    this.route.navigate(['ui/task/', id]);
  }

  public readonly sortOrder = {
    asc: 1,
    desc: -1,
  };

  public advancedHeaders = this.yourTasksService.getAdvancedHeaders();
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
  private countPerPage = 4;
  

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
      this.advancedHeaders.forEach((cell) => {
        cell.sort = (cell.sort !== null) ? 0 : null;
      });
      header.sort = (current === 1) ? -1 : 1;
      this.changeAdvanceSorting(header.sort, index);
      this.changePage(1, true);
    }
  }

  public getAdvancedTableNumOfPage(countPerPage) {
    console.log(this.advancedTable)
    return Math.ceil(this.advanceTableData.length / countPerPage);
  }

  public getAdvancedTablePage(page, countPerPage) {
    return this.advanceTableData.slice((page - 1) * countPerPage, page * countPerPage);
  }

  public changeAdvanceSorting(order, index) {
    this.advanceTableData = this.sorting(this.advanceTableData, order, index);
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
