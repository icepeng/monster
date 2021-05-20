import { Injectable } from '@angular/core';
import * as fromBoard from '@monster/board/reducers';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Card, List } from '../models';
import { BoardApi } from '../models/board-api';
import { moveItemIndex, transferArrayItem } from './util';

@Injectable({
  providedIn: 'root',
})
export class BoardApiService {
  constructor(private store: Store) {}

  getBoard(): Observable<BoardApi> {
    return of({
      id: '0',
      title: 'Sample board',
      lists: [
        {
          id: '0',
          boardId: '0',
          index: 0,
          title: 'To-do',
          cards: [
            {
              id: '0',
              listId: '0',
              index: 0,
              title: '몬스터',
              description: '에너지',
            },
            {
              id: '1',
              listId: '0',
              index: 1,
              title: '레드불',
              description: '날개를 달아줘요',
            },
          ],
        },
        {
          id: '1',
          boardId: '0',
          index: 1,
          title: 'In-Progress',
          cards: [
            {
              id: '2',
              listId: '1',
              index: 0,
              title: '캘리포니아 골드C',
              description: '1000mg',
            },
            {
              id: '3',
              listId: '1',
              index: 1,
              title: '코카콜라',
              description: '500ml',
            },
          ],
        },
      ],
    });
  }

  addList(boardId: string, title: string): Observable<List> {
    return this.store.select(fromBoard.selectListIds).pipe(
      take(1),
      map((ids) => ({
        id: [...Array(32)]
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join(''),
        index: ids.length,
        boardId: boardId,
        title: title,
      }))
    );
  }

  moveList(
    boardId: string,
    previousIndex: number,
    currentIndex: number
  ): Observable<List[]> {
    return this.store.select(fromBoard.selectAllLists).pipe(
      take(1),
      map((lists) => lists.filter((list) => list.boardId === boardId)),
      map((lists) => moveItemIndex(lists, previousIndex, currentIndex))
    );
  }

  addCard(listId: string, title: string): Observable<Card> {
    return this.store.select(fromBoard.selectCardIds).pipe(
      take(1),
      map((ids) => ({
        id: [...Array(32)]
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join(''),
        listId: listId,
        index: ids.length,
        title: title,
        description: '',
      }))
    );
  }

  moveCard(
    previousListId: string,
    currentListId: string,
    previousIndex: number,
    currentIndex: number
  ): Observable<Card[]> {
    return this.store.select(fromBoard.selectAllCards).pipe(
      take(1),
      map((cards) => [
        cards.filter((card) => card.listId === previousListId),
        cards.filter((card) => card.listId === currentListId),
      ]),
      map(([prev, curr]) => {
        if (previousListId === currentListId) {
          return moveItemIndex(prev, previousIndex, currentIndex);
        } else {
          return transferArrayItem(
            prev,
            curr,
            previousIndex,
            currentIndex,
            currentListId
          );
        }
      })
    );
  }
}
