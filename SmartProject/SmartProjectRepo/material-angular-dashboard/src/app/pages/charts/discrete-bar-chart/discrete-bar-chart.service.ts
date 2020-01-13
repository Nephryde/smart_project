import { Injectable } from '@angular/core';

@Injectable()
export class DiscreteBarChartService {
  public getCumulativeReturn() {
    return [
      {
        label: 'Test Testowy',
        value: 22,
      },
      {
        label: 'Krzysztof Jeżyna',
        value: 31,
      },
      {
        label: 'Jan Kowalski',
        value: 16,
      },
      {
        label: 'Jan Gierasimiuk',
        value: 19,
      },
      {
        label: 'Bożena kowalska',
        value: 26,
      },
    ];
  }
}
