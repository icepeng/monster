import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { List } from '../models';
import { BoardApi } from '../models/board-api';

@Injectable({
  providedIn: 'root',
})
export class BoardApiService {
  constructor() {}

  getBoard(): Observable<BoardApi> {
    return of({
      id: '0',
      title: 'Sample board',
      lists: [
        {
          id: '0',
          boardId: '0',
          title: 'To-do',
          cards: [
            {
              id: '0',
              listId: '0',
              title: '몬스터',
              description: '에너지',
            },
            {
              id: '1',
              listId: '0',
              title: '레드불',
              description: '날개를 달아줘요',
            },
          ],
        },
        {
          id: '1',
          boardId: '0',
          title: 'In-Progress',
          cards: [
            {
              id: '2',
              listId: '1',
              title: '캘리포니아 골드C',
              description: '1000mg',
            },
            {
              id: '3',
              listId: '1',
              title: '코카콜라',
              description: '500ml',
            },
          ],
        },
      ],
    });
  }

  addList(boardId: string, title: string): Observable<List> {
    return of({
      id: [...Array(32)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join(''),
      boardId: boardId,
      title: title,
    });
  }
}
