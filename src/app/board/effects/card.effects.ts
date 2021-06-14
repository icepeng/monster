import { Injectable } from '@angular/core';
import { BoardApiActions, CardPageActions } from '@monster/board/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Card, Comment } from '../models';
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

  addComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardPageActions.addComment),
      switchMap((action) =>
        this.boardApiService.addComment(action.cardId, action.content).pipe(
          map((comment: Comment) =>
            BoardApiActions.addCommentSuccess({ comment })
          ),
          catchError((error) =>
            of(BoardApiActions.addCommentFailure({ error }))
          )
        )
      )
    )
  );

  editComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardPageActions.editComment),
      switchMap((action) =>
        this.boardApiService.editComment(action.id, action.content).pipe(
          map((comment: Comment) =>
            BoardApiActions.editCommentSuccess({ comment })
          ),
          catchError((error) =>
            of(BoardApiActions.editCommentFailure({ error }))
          )
        )
      )
    )
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CardPageActions.deleteComment),
      switchMap((action) =>
        this.boardApiService.deleteComment(action.id).pipe(
          map((id: string) =>
            BoardApiActions.deleteCommentSuccess({ id })
          ),
          catchError((error) =>
            of(BoardApiActions.deleteCommentFailure({ error }))
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
