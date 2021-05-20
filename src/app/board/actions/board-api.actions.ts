import { createAction, props } from '@ngrx/store';
import { Card, List } from '../models';
import { BoardApi } from '../models/board-api';

/**
 * Load Board Actions
 */
export const loadBoardSuccess = createAction(
  '[Board/API] Load Board Success',
  props<{ board: BoardApi }>()
);

export const loadBoardFailure = createAction(
  '[Board/API] Load Board Failure',
  props<{ error: any }>()
);

export const addListSuccess = createAction(
  '[Board/API] Add List Success',
  props<{ list: List }>()
);

export const addListFailure = createAction(
  '[Board/API] Add List Failure',
  props<{ error: any }>()
);

export const addCardSuccess = createAction(
  '[Board/API] Add Card Success',
  props<{ card: Card }>()
);

export const addCardFailure = createAction(
  '[Board/API] Add Card Failure',
  props<{ error: any }>()
);

export const moveListSuccess = createAction(
  '[Board/API] Move List Success',
  props<{ lists: List[] }>()
);

export const moveListFailure = createAction(
  '[Board/API] Move List Failure',
  props<{ error: any }>()
);