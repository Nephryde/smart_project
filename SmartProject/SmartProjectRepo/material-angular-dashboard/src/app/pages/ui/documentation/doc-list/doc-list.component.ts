import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { PassToReleases } from '../documentation.component';
import { ProjectService } from 'app/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss']
})
export class DocListComponent implements OnInit {
  @HostBinding('class.releases-table') private readonly projectsTable = true;
  @Input() retreivedData: PassToReleases;
  files: Object[] = [];
  public fileHeaders = this.projectService.getDocHeaders();
  progress: number;

  constructor(private projectService: ProjectService, private router: Router) { }

  async ngOnInit() {
    this.retreivedData.projectId;
    this.files = await this.getProjectDocu(this.retreivedData.projectId);
    console.log(this.files)
  }

  getProjectDocu(projectId: number) : Promise<any> {
    return this.projectService.getProjectDoc(projectId).toPromise();
  }

  sendFiles() {
    this.router.navigate(['ui/send/', this.retreivedData.projectId]);
  }

}
