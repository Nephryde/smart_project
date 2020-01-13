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
import { ProjectService } from 'app/services/project.service';
import { AddProjectComponent } from './add-new/add-project/add-project.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { ProjectsComponent } from './projects/projects.component';
import { ReleasesComponent } from './projects/releases/releases.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskService } from 'app/services/task.service';
import { LogTimeComponent } from './task/log-time/log-time.component';
import { AddTaskComponent } from './add-new/add-task/add-task.component';
import { ProjectManageComponent } from './projects/project-manage/project-manage.component';
import { ProjectUsersComponent } from './projects/project-manage/project-users/project-users.component';
import { AddReleaseComponent } from './add-new/add-release/add-release.component';
import { CalendarComponent } from './projects/calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { DocumentationComponent } from './documentation/documentation.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { DocListComponent } from './documentation/doc-list/doc-list.component';
import { SendFilesComponent } from './send-files/send-files.component';
import { AddCommentComponent } from './task/add-comment/add-comment.component';
import { WorkTimeComponent } from './work-time/work-time.component';
import { EditTaskComponent } from './add-new/edit-task/edit-task.component';
import { AddUserComponent } from './projects/project-manage/add-user/add-user.component';

@NgModule({
  imports: [
    CommonModule,
    UIRoutingModule,
    ThemeModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    MaterialAngularSelectModule,
    RightSidebarModule,
    ReactiveFormsModule,
    FormsModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    ScrollingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    AngularFileUploaderModule,
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
    AddProjectComponent,
    ProjectsComponent,
    ReleasesComponent,
    TasksComponent,
    LogTimeComponent,
    AddTaskComponent,
    ProjectManageComponent,
    ProjectUsersComponent,
    AddReleaseComponent,
    CalendarComponent,
    DocumentationComponent,
    DocListComponent,
    SendFilesComponent,
    AddCommentComponent,
    WorkTimeComponent,
    EditTaskComponent,
    AddUserComponent,
  ],
  providers: [
    TablesService,
    TaskService,
    ProjectService,
  ],
})
export class UIModule { }
