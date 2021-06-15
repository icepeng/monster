import { createAction, props } from '@ngrx/store';

export const enter = createAction('[Board Page] Enter');

export const addList = createAction(
  '[Board Page] Add List',
  props<{ title: string }>()
);

export const addCard = createAction(
  '[Board Page] Add Card',
  props<{ listId: string; title: string }>()
);

export const moveList = createAction(
  '[Board Page] Move List',
  props<{ previousIndex: number; currentIndex: number }>()
);

export const moveCard = createAction(
  '[Board Page] Move Card',
  props<{
    previousList: string;
    currentList: string;
    previousIndex: number;
    currentIndex: number;
  }>()
);

export const deleteList = createAction(
  '[Board Page] Delete List',
  props<{ id: string }>()
);

export const toggleCardDue = createAction(
  '[Board Page] Toggle Card Due',
  props<{ cardId: string }>()
);

export const toggleLabelExpand = createAction(
  '[Board Page] Toggle Label Expand'
);

export const editListTitle = createAction(
  '[Board Page] Edit List Title',
  props<{ listId: string; title: string }>()
);
