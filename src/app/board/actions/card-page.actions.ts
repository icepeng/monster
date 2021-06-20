import { createAction, props } from '@ngrx/store';

export const editTitle = createAction(
  '[Card Page] Edit title',
  props<{ id: number; title: string }>()
);

export const editDescription = createAction(
  '[Card Page] Edit Description',
  props<{ cardId: number; description: string }>()
);

export const deleteCard = createAction(
  '[Card Page] Delete Card',
  props<{ id: number }>()
);

export const addComment = createAction(
  '[Card Page] Add Comment',
  props<{ cardId: number; content: string }>()
);

export const editComment = createAction(
  '[Card Page] Edit comment',
  props<{ id: number; content: string }>()
);

export const deleteComment = createAction(
  '[Card Page] Delete comment',
  props<{ id: number }>()
);
