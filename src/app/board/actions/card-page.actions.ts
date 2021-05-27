import { createAction, props } from '@ngrx/store';

export const editTitle = createAction(
  '[Card Page] Edit title',
  props<{ id: string, title: string }>()
);
