import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialAngularSelectModule } from 'material-angular-select';

import { ThemeModule } from 'theme';

import { ButtonsComponent } from './buttons';
import { CardsComponent } from './cards';
import { ColorsComponent } from './colors';
import { FormsComponent } from './forms';
import { IconsComponent } from './icons';
import { RightSidebarModule } from './right-sidebar';
import { TablesComponent, TablesService } from './tables';
import { TypographyComponent } from './typography';
import { UIRoutingModule } from './ui-routing.module';
import { TaskComponent } from './task/task.component';
import { TaskService } from './task/task.service';
import { TaskAddComponent } from './task-add/task-add.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectService } from 'app/services/project.service';
import { ProjectReleasesComponent } from './projects/project-releases/project-releases.component';
import { ReleaseTasksComponent } from './projects/release-tasks/release-tasks.component';

@NgModule({
  imports: [
    CommonModule,
    UIRoutingModule,
    ThemeModule,
    MaterialAngularSelectModule,
    RightSidebarModule,
  ],
  declarations: [
    ButtonsComponent,
    CardsComponent,
    ColorsComponent,
    FormsComponent,
    IconsComponent,
    TypographyComponent,
    TablesComponent,
    TaskComponent,
    TaskAddComponent,
    ProjectsComponent,
    ProjectReleasesComponent,
    ReleaseTasksComponent,
  ],
  providers: [
    TablesService,
    TaskService,
    ProjectService,
  ],
})
export class UIModule { }
