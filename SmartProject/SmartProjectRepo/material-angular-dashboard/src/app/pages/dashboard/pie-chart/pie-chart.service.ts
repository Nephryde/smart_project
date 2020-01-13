import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable()
export class PieChartService {
  
  d: {key: string, hours: number}[] = [];
  c: {key: string, hours: number}[] = [];
  constructor(private http: HttpClient) { }

  public async getSchedule() {
    this.d = await this.getDailySchedule();
    console.log(this.d); 
    return this.d;
  }

  getDailySchedule() : Promise<any> {
    return this.http.get(environment.apiBaseUrl + '/Project/GetDailySchedule/').toPromise();
  }

  public getDaySchedule() {
    return [
      {
        key: 'Analiza',
        hours: 2
      },
      {
        key: 'Programowanie',
        hours: 3,
      },
      {
        key: 'Testy developerskie',
        hours: 1,
      },
      {
        key: 'Inne',
        hours: 1,
      },
      {
        key: 'Konsultacje wdrożeniowe',
        hours: 1,
      },
    ];
  }
}
