import { List } from '@monster/board/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { BoardApiActions } from '../actions';

export const listsFeatureKey = 'lists';

export interface State extends EntityState<List> {}

export const adapter: EntityAdapter<List> = createEntityAdapter<List>({
  selectId: (list: List) => list.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(BoardApiActions.loadBoardSuccess, (state, { board }) =>
    adapter.setAll(board.lists, state)
  ),
  on(BoardApiActions.addListSuccess, (state, { list }) =>
    adapter.addOne(list, state)
  ),
  on(BoardApiActions.moveListSuccess, (state, { lists }) =>
    adapter.upsertMany(lists, state)
  ),
  on(BoardApiActions.editListTitleSuccess, (state, { list }) =>
    adapter.updateOne(
      {
        id: list.id,
        changes: {
          title: list.title,
        },
      },
      state
    )
  ),
  on(BoardApiActions.deleteListSuccess, (state, { id, cardIds }) =>
    adapter.removeOne(id, state)
  )
);
