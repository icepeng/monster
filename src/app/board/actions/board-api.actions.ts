import { createAction, props } from '@ngrx/store';
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
