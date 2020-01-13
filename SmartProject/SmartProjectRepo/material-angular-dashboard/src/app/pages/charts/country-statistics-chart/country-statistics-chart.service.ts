import { Injectable } from '@angular/core';

@Injectable()
export class CountryStatisticsChartService {
  public getCountryStatistics() {
    return [
      {
        key: 'OperaBM',
        y: 95,
      },
      {
        key: 'SiteCore',
        y: 3,
      },
      {
        key: 'Good Repair',
        y: 2,
      },
    ];
  }
}
