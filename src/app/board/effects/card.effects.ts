import { Injectable } from '@angular/core';
import { BoardApiActions, CardPageActions } from '@monster/board/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Card } from '../models';
import { BoardApiService } from '../services/board-api.service';

@Injectable()
export class CardEffects {
  editTitle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardPageActions.editTitle),
      switchMap((action) =>
        this.boardApiService.editCardTitle(action.id, action.title).pipe(
          map((card: Card) => BoardApiActions.editCardTitleSuccess({ card })),
          catchError((error) =>
            of(BoardApiActions.editCardTitleFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private boardApiService: BoardApiService
  ) {}
}
