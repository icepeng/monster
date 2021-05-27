import { Injectable } from '@angular/core';
import * as fromBoard from '@monster/board/reducers';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Card, List } from '../models';
import { BoardApi } from '../models/board-api';
import { boardMock } from './mock';
import { moveItemIndex, transferArrayItem } from './util';

@Injectable({
  providedIn: 'root',
})
export class BoardApiService {
  constructor(private store: Store) {}

  getBoard(): Observable<BoardApi> {
    return of(boardMock);
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
        due: null,
        dueComplete: false,
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

  toggleCardDue(cardId: string): Observable<Card> {
    return this.store.select(fromBoard.selectCardEntities).pipe(
      take(1),
      map((cards) => {
        return {
          ...cards[cardId]!,
          dueComplete: !cards[cardId]?.dueComplete,
        };
      })
    );
  }

  editCardTitle(cardId: string, title: string): Observable<Card> {
    return this.store.select(fromBoard.selectCardEntities).pipe(
      take(1),
      map((cards) => {
        return {
          ...cards[cardId]!,
          title,
        };
      })
    );
  }
}
