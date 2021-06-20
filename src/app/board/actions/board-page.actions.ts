import { createAction, props } from '@ngrx/store';

export const enter = createAction(
  '[Board Page] Enter',
  props<{ id: number }>()
);

export const addList = createAction(
  '[Board Page] Add List',
  props<{ title: string }>()
);

export const addCard = createAction(
  '[Board Page] Add Card',
  props<{ listId: number; title: string }>()
);

export const moveList = createAction(
  '[Board Page] Move List',
  props<{ boardId: number; previousIndex: number; currentIndex: number }>()
);

export const moveCard = createAction(
  '[Board Page] Move Card',
  props<{
    previousList: number;
    currentList: number;
    previousIndex: number;
    currentIndex: number;
  }>()
);

export const deleteList = createAction(
  '[Board Page] Delete List',
  props<{ id: number }>()
);

export const toggleCardDue = createAction(
  '[Board Page] Toggle Card Due',
  props<{ cardId: number }>()
);

export const toggleLabelExpand = createAction(
  '[Board Page] Toggle Label Expand'
);

export const editListTitle = createAction(
  '[Board Page] Edit List Title',
  props<{ listId: number; title: string }>()
);
