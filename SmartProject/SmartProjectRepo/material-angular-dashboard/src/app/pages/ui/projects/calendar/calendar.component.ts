import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { Router } from '@angular/router';
import { ProjectTasksCalendar } from 'app/models/project/project-tasks-calendar.model';
import { ProjectService } from 'app/services/project.service';
import { CalendarEventActionsComponent } from 'angular-calendar/modules/common/calendar-event-actions.component';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();

  tevents: CalendarEvent[] = [
    {
      start: new Date(Date.parse('2019-12-12 00:00:00.0000000')),
      end: null,
      title: 'A 3 day event',
      color: colors.red,
      allDay: true,
    },
    // {
    //   start: startOfDay(Date.parse('2019-12-09 00:00:00.0000000')),
    //   title: 'An event with no end date',
    //   color: colors.blue,
    //   actions: this.actions
    // },
    // {
    //   start: subDays(endOfMonth(Date.parse('2019-12-09 00:00:00.0000000')),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true
    //   },
    //   draggable: true
    // }
  ];

  activeDayIsOpen: boolean = true;
  projectId: number;
  projectTasks: ProjectTasksCalendar[];
  events: CalendarEvent[] = [];
  loaded = false;

  constructor(private modal: NgbModal, private route: Router, private projectService: ProjectService) {}

  async ngOnInit() {
    const urlArr = this.route.url.split("/");
    this.projectId = Number(urlArr[4]);
    console.log(this.projectId);

    this.projectTasks = await this.getProjectTasks(this.projectId);
    console.log(this.projectTasks);
    console.log(this.loaded);
  }

  uploadEvents() {
    this.projectTasks.forEach(element => {
      const mappedEvent: CalendarEvent = {
        start: new Date(Date.parse(element.start)),
        end: element.end == null ? null : new Date(Date.parse(element.end)),
        title: element.title,
        color: colors.red,
        allDay: true,
      }
      this.events.push(mappedEvent);
    });
    this.loaded = true;
  }

  getProjectTasks(projectId: number) : Promise<any> {
    return this.projectService.getProjectTasksToCalendar(projectId).toPromise();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
