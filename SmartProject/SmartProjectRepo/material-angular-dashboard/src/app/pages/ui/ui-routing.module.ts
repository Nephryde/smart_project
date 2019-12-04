import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutsModule } from 'app/layouts';
import { CommonLayoutComponent } from 'app/layouts/common-layout';
import { ButtonsComponent } from './buttons';
import { CardsComponent } from './cards';
import { ColorsComponent } from './colors';
import { FormsComponent } from './forms';
import { IconsComponent } from './icons';
import { RightSidebarComponent } from './right-sidebar';
import { TablesComponent } from './tables';
import { TypographyComponent } from './typography';
import { TaskComponent } from './task/task.component';
import { AddProjectComponent } from './add-new/add-project/add-project.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { LogTimeComponent } from './task/log-time/log-time.component';
import { AddTaskComponent } from './add-new/add-task/add-task.component';
import { ProjectManageComponent } from './projects/project-manage/project-manage.component';
import { AddReleaseComponent } from './add-new/add-release/add-release.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CommonLayoutComponent,
        children: [
          { path: 'projects', component: ProjectsComponent, pathMatch: 'full' },
          { path: 'project-manage/:id', component: ProjectManageComponent, pathMatch: 'full' },
          { path: 'add-project', component: AddProjectComponent, pathMatch: 'full' },
          { path: 'add-task', component: AddTaskComponent, pathMatch: 'full' },
          { path: 'add-release/:id', component: AddReleaseComponent, pathMatch: 'full' },
          { path: 'task/:id', component: TaskComponent, pathMatch: 'full' },
          { path: 'task/log-time/:id', component: LogTimeComponent, pathMatch: 'full' },
          { path: 'tasks/:id', component: TasksComponent, pathMatch: 'full' },
          { path: 'buttons', component: ButtonsComponent, pathMatch: 'full' },
          { path: 'cards', component: CardsComponent, pathMatch: 'full' },
          { path: 'colors', component: ColorsComponent, pathMatch: 'full' },
          { path: 'forms', component: FormsComponent, pathMatch: 'full' },
          { path: 'icons', component: IconsComponent, pathMatch: 'full' },
          { path: 'typography', component: TypographyComponent, pathMatch: 'full' },
          { path: 'tables', component: TablesComponent, pathMatch: 'full' },
          { path: 'right-sidebar', component: RightSidebarComponent, pathMatch: 'full' },
        ],
      },
    ]),
    LayoutsModule,
  ],
  exports: [RouterModule],
})
export class UIRoutingModule { }
