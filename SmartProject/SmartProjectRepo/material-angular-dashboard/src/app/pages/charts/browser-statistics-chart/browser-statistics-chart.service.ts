import { Injectable } from '@angular/core';

@Injectable()
export class BrowserStatisticsChartService {
  public getBrowserStatistics() {
    return [
      {
        key: 'Modyfikacja',
        y: 60,
      },
      {
        key: 'Zadanie',
        y: 14,
      },
      {
        key: 'Błąd',
        y: 26,
      },
    ];
  }
}
