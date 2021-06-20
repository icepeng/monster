import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { moveItemIndex, transferArrayItem } from '@icepeng/monster-lib';
import * as fromBoard from '@monster/board/reducers';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Card, Comment, List } from '../models';
import { BoardApi } from '../models/board-api';
import { boardMock, generateId } from './mock';

@Injectable({
  providedIn: 'root',
})
export class BoardApiService {
  constructor(private store: Store, private http: HttpClient) {}

  getBoard(): Observable<BoardApi> {
    return of(boardMock);
  }

  addList(boardId: string, title: string): Observable<List> {
    return this.store.select(fromBoard.selectListIds).pipe(
      take(1),
      map((ids) => ({
        id: generateId(),
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

  editListTitle(listId: string, title: string): Observable<List> {
    return this.store.select(fromBoard.selectListEntities).pipe(
      take(1),
      map((lists) => {
        return {
          ...lists[listId]!,
          title,
        };
      })
    );
  }

  deleteList(id: string): Observable<{ id: string; cardIds: string[] }> {
    return this.store.select(fromBoard.selectAllCards).pipe(
      take(1),
      map((cards) => {
        return {
          id,
          cardIds: cards
            .filter((card) => card.listId === id)
            .map((card) => card.id),
        };
      })
    );
  }

  addCard(listId: string, title: string, index: number): Observable<Card> {
    return this.http
      .post<{ card: Card }>(`${environment.apiAddress}/cards`, {
        listId,
        title,
        index,
      })
      .pipe(map((res) => res.card));
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

  setDueComplete(cardId: string, dueComplete: boolean): Observable<Card> {
    return this.http
      .put<{ card: Card }>(
        `${environment.apiAddress}/cards/${cardId}/dueComplete`,
        {
          dueComplete,
        }
      )
      .pipe(map((res) => res.card));
  }

  editCardTitle(cardId: string, title: string): Observable<Card> {
    return this.http
      .put<{ card: Card }>(`${environment.apiAddress}/cards/${cardId}/title`, {
        title,
      })
      .pipe(map((res) => res.card));
  }

  editCardDescription(cardId: string, description: string): Observable<Card> {
    return this.http
      .put<{ card: Card }>(`${environment.apiAddress}/cards/${cardId}/title`, {
        description,
      })
      .pipe(map((res) => res.card));
  }

  deleteCard(id: string): Observable<string> {
    return this.http
      .delete<{ id: string }>(`${environment.apiAddress}/cards/${id}`)
      .pipe(map((res) => res.id));
  }

  addComment(cardId: string, content: string): Observable<Comment> {
    return of({
      id: generateId(),
      cardId: cardId,
      content: content,
    });
  }

  editComment(id: string, content: string): Observable<Comment> {
    return this.store.select(fromBoard.selectCommentEntities).pipe(
      take(1),
      map((comments) => {
        return {
          ...comments[id]!,
          content,
        };
      })
    );
  }

  deleteComment(id: string): Observable<string> {
    return of(id);
  }
}
