import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Card, Comment, List } from '../models';
import { BoardApi } from '../models/board-api';

@Injectable({
  providedIn: 'root',
})
export class BoardApiService {
  constructor(private store: Store, private http: HttpClient) {}

  getBoard(id: number): Observable<BoardApi> {
    return this.http.get<BoardApi>(`${environment.apiAddress}/boards/${id}`);
  }

  addList(boardId: number, title: string, index: number): Observable<List> {
    return this.http
      .post<{ list: List }>(`${environment.apiAddress}/lists`, {
        boardId,
        title,
        index,
      })
      .pipe(map((res) => res.list));
  }

  moveList(
    boardId: number,
    previousIndex: number,
    currentIndex: number
  ): Observable<List[]> {
    return this.http
      .post<{ lists: List[] }>(`${environment.apiAddress}/lists/move`, {
        boardId,
        previousIndex,
        currentIndex,
      })
      .pipe(map((res) => res.lists));
  }

  editListTitle(listId: number, title: string): Observable<List> {
    return this.http
      .put<{ list: List }>(`${environment.apiAddress}/lists/${listId}/title`, {
        title,
      })
      .pipe(map((res) => res.list));
  }

  deleteList(id: number): Observable<{ id: number; cardIds: number[] }> {
    return this.http.delete<{ id: number; cardIds: number[] }>(
      `${environment.apiAddress}/lists/${id}`
    );
  }

  addCard(listId: number, title: string, index: number): Observable<Card> {
    return this.http
      .post<{ card: Card }>(`${environment.apiAddress}/cards`, {
        listId,
        title,
        index,
      })
      .pipe(map((res) => res.card));
  }

  moveCard(
    previousListId: number,
    currentListId: number,
    previousIndex: number,
    currentIndex: number
  ): Observable<Card[]> {
    return this.http
      .post<{ cards: Card[] }>(`${environment.apiAddress}/cards/move`, {
        previousListId,
        currentListId,
        previousIndex,
        currentIndex,
      })
      .pipe(map((res) => res.cards));
  }

  setDueComplete(cardId: number, dueComplete: boolean): Observable<Card> {
    return this.http
      .put<{ card: Card }>(
        `${environment.apiAddress}/cards/${cardId}/dueComplete`,
        {
          dueComplete,
        }
      )
      .pipe(map((res) => res.card));
  }

  editCardTitle(cardId: number, title: string): Observable<Card> {
    return this.http
      .put<{ card: Card }>(`${environment.apiAddress}/cards/${cardId}/title`, {
        title,
      })
      .pipe(map((res) => res.card));
  }

  editCardDescription(cardId: number, description: string): Observable<Card> {
    return this.http
      .put<{ card: Card }>(`${environment.apiAddress}/cards/${cardId}/description`, {
        description,
      })
      .pipe(map((res) => res.card));
  }

  deleteCard(id: number): Observable<number> {
    return this.http
      .delete<{ id: number }>(`${environment.apiAddress}/cards/${id}`)
      .pipe(map((res) => res.id));
  }

  addComment(cardId: number, content: string): Observable<Comment> {
    return this.http
      .post<{ comment: Comment }>(`${environment.apiAddress}/comments`, {
        cardId,
        content,
      })
      .pipe(map((res) => res.comment));
  }

  editComment(id: number, content: string): Observable<Comment> {
    return this.http
      .post<{ comment: Comment }>(`${environment.apiAddress}/comments/${id}`, {
        content,
      })
      .pipe(map((res) => res.comment));
  }

  deleteComment(id: number): Observable<number> {
    return this.http
      .delete<{ id: number }>(`${environment.apiAddress}/comments/${id}`)
      .pipe(map((res) => res.id));
  }
}
