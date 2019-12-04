import { Injectable } from '@angular/core';

@Injectable()
export class PieChartService {
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
