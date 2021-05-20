import { createAction, props } from '@ngrx/store';

export const enter = createAction('[Board Page] Enter');

export const addList = createAction(
  '[Board Page] Add List',
  props<{ title: string }>()
);
