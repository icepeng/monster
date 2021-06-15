import { createAction, props } from '@ngrx/store';

export const editTitle = createAction(
  '[Card Page] Edit title',
  props<{ id: string; title: string }>()
);

export const editDescription = createAction(
  '[Card Page] Edit Description',
  props<{ cardId: string; description: string }>()
);

export const deleteCard = createAction(
  '[Card Page] Delete Card',
  props<{ id: string }>()
);

export const addComment = createAction(
  '[Card Page] Add Comment',
  props<{ cardId: string; content: string }>()
);

export const editComment = createAction(
  '[Card Page] Edit comment',
  props<{ id: string; content: string }>()
);

export const deleteComment = createAction(
  '[Card Page] Delete comment',
  props<{ id: string }>()
);
