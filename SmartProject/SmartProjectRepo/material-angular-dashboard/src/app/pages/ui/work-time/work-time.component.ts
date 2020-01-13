import { Component, OnInit, HostBinding } from '@angular/core';
import { ProjectService } from 'app/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-time',
  templateUrl: './work-time.component.html',
  styleUrls: ['./work-time.component.scss']
})


export class WorkTimeComponent implements OnInit {
  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-cell') private readonly mdlCell = true;
  @HostBinding('class.mdl-cell--12-col-desktop') private readonly mdlCell12ColDesktop = true;
  @HostBinding('class.mdl-cell--12-col-tablet') private readonly mdlCell12ColTablet = true;
  @HostBinding('class.mdl-cell--4-col-phone') private readonly mdlCell4ColPhone = true;
  @HostBinding('class.mdl-cell--top') private readonly mdlCellTop = true;
  @HostBinding('class.ui-tables') private readonly uiTables = true;
  workTime: Object[] = [];
  sortedWorkTime: Object[] = [];
  public workTimeHeaders = this.projectService.getWorkTimeHeaders();

  constructor(private projectService: ProjectService, private router: Router) { }

  async ngOnInit() {
    this.workTime = await this.getWorkTime();
    console.log(this.workTime)
    this.sortedWorkTime = this.workTime.sort((n1, n2) => {
        if(n1.date < n2.date) {
          return 1;
        }

        if(n1.date > n2.date) {
          return -1;
        }
 
        return 0;
      }
    )
  }

  getWorkTime() : Promise<any> {
    return this.projectService.getLoggedTime().toPromise();
  }

  goToTask(taskId: number) {
    this.router.navigate(['ui/task/', taskId]);
  }

}
