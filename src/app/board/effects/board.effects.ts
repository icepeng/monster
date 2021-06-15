import { Injectable } from '@angular/core';
import { BoardApiActions, BoardPageActions } from '@monster/board/actions';
import * as fromBoard from '@monster/board/reducers';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Card, List } from '../models';
import { BoardApi } from '../models/board-api';
import { BoardApiService } from '../services/board-api.service';

@Injectable()
export class BoardEffects {
  loadBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardPageActions.enter),
      switchMap(() =>
        this.boardApiService.getBoard().pipe(
          map((board: BoardApi) => BoardApiActions.loadBoardSuccess({ board })),
          catchError((error) => of(BoardApiActions.loadBoardFailure({ error })))
        )
      )
    )
  );

  addList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardPageActions.addList),
      withLatestFrom(this.store.select(fromBoard.selectBoard)),
      switchMap(([action, board]) =>
        this.boardApiService.addList(board.id, action.title).pipe(
          map((list: List) => BoardApiActions.addListSuccess({ list })),
          catchError((error) => of(BoardApiActions.addListFailure({ error })))
        )
      )
    )
  );

  moveList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardPageActions.moveList),
      withLatestFrom(this.store.select(fromBoard.selectBoard)),
      switchMap(([action, board]) =>
        this.boardApiService
          .moveList(board.id, action.previousIndex, action.currentIndex)
          .pipe(
            map((lists) => BoardApiActions.moveListSuccess({ lists })),
            catchError((error) =>
              of(BoardApiActions.moveListFailure({ error }))
            )
          )
      )
    )
  );

  deleteList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardPageActions.deleteList),
      switchMap((action) =>
        this.boardApiService.deleteList(action.id).pipe(
          map(({ id, cardIds }) =>
            BoardApiActions.deleteListSuccess({ id, cardIds })
          ),
          catchError((error) =>
            of(BoardApiActions.deleteListFailure({ error }))
          )
        )
      )
    )
  );

  editListTitle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardPageActions.editListTitle),
      switchMap((action) =>
        this.boardApiService.editListTitle(action.listId, action.title).pipe(
          map((list: List) => BoardApiActions.editListTitleSuccess({ list })),
          catchError((error) =>
            of(BoardApiActions.editListTitleFailure({ error }))
          )
        )
      )
    )
  );

  addCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardPageActions.addCard),
      switchMap((action) =>
        this.boardApiService.addCard(action.listId, action.title).pipe(
          map((card: Card) => BoardApiActions.addCardSuccess({ card })),
          catchError((error) => of(BoardApiActions.addCardFailure({ error })))
        )
      )
    )
  );

  moveCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardPageActions.moveCard),
      switchMap((action) =>
        this.boardApiService
          .moveCard(
            action.previousList,
            action.currentList,
            action.previousIndex,
            action.currentIndex
          )
          .pipe(
            map((cards) => BoardApiActions.moveCardSuccess({ cards })),
            catchError((error) =>
              of(BoardApiActions.moveCardFailure({ error }))
            )
          )
      )
    )
  );

  toggleCardDue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardPageActions.toggleCardDue),
      switchMap((action) =>
        this.boardApiService.toggleCardDue(action.cardId).pipe(
          map((card: Card) => BoardApiActions.toggleCardDueSuccess({ card })),
          catchError((error) =>
            of(BoardApiActions.toggleCardDueFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private boardApiService: BoardApiService
  ) {}
}
