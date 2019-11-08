import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ThemeModule } from 'theme';

import { CotoneasterCardComponent } from './cotoneaster-card';
import { DashboardComponent } from './dashboard.component';
import { LineChartComponent } from './line-chart';
import { PieChartComponent } from './pie-chart';
import { RobotCardComponent } from './robot-card';
import { TableCardComponent } from './table-card';
import { TodoListComponent } from './todo-list';
import { TrendingComponent } from './trending';
import { WeatherComponent } from './weather';
import { YourTasksComponent } from './your-tasks/your-tasks.component';
import { YourTasksService } from './your-tasks/your-tasks.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'app/services';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
  ],
  declarations: [
    DashboardComponent,
    LineChartComponent,
    PieChartComponent,
    WeatherComponent,
    CotoneasterCardComponent,
    TableCardComponent,
    RobotCardComponent,
    TodoListComponent,
    TrendingComponent,
    YourTasksComponent,
  ],
  exports: [
    WeatherComponent,
    TrendingComponent,
  ],
  providers: [
    YourTasksService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
})
export class DashboardModule { }
