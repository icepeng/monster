import { Injectable } from '@angular/core';
import { BoardApiActions, BoardPageActions } from '@monster/board/actions';
import * as fromBoard from '@monster/board/reducers';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { List } from '../models';
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

  constructor(
    private actions$: Actions,
    private store: Store,
    private boardApiService: BoardApiService
  ) {}
}
