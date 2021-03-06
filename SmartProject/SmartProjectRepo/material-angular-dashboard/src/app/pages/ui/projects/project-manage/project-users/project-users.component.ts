import { Component, OnInit, HostBinding, ViewChild, Input } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ProjectRoles } from 'app/models/project/project-roles.model';
import { ProjectService } from 'app/services/project.service';

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrls: ['./project-users.component.scss']
})
export class ProjectUsersComponent implements OnInit {
  @HostBinding('class.employer-form') private readonly employerForm = true;
  rolesList: ProjectRoles[];
  projectUsers: any[];
  filteredProjectUsers: any[];
  @Input() projectId: number;
  @ViewChild(MatSelectionList, { static: true }) roles: MatSelectionList;

  constructor(private projectService: ProjectService) { }

  async ngOnInit() {
    this.projectService.getProjectRoles().subscribe((res: any) => {
      this.rolesList = res;
    })

    this.projectUsers = await this.getProjectUsersData(this.projectId);

    this.roles.selectionChange.subscribe((s: MatSelectionListChange) => {

      this.filteredProjectUsers = this.projectUsers;
      this.roles.deselectAll();
      s.option.selected = true;
      console.log(s.option.value);
      this.filteredProjectUsers = this.projectUsers.filter(x => x.roleId === s.option.value);
      console.log(this.filteredProjectUsers);
    });

    console.log(this.projectUsers);
  }

  getProjectUsersData(id: number) : Promise<any> {
    return this.projectService.getProjectUsers(id).toPromise();
  }

  onRoleChange() {
    console.log(this.filteredProjectUsers);
  }

}
