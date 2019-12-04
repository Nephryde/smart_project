import { Injectable } from '@angular/core';

@Injectable()
export class TodoListService {
  public getItems(): object[] {
    return [
      {
        title: 'Naprawić assety',
        id: 1651644545,
        completed: false,
      },
      {
        title: 'Przerwa na obiad',
        id: 1651646545,
        completed: false,
      },
      {
        title: 'Wypełnić raporty',
        id: 5451646545,
        completed: true,
      },
      {
        title: 'Podpisać dokumenty',
        id: 5428646545,
        completed: false,
      },
    ];
  }
}
