import { List } from '@monster/board/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { BoardApiActions, BoardPageActions } from '../actions';

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
    adapter.setAll(
      board.lists.map(({ cards, ...list }) => list),
      state
    )
  ),
  on(BoardApiActions.addListSuccess, (state, { list }) =>
    adapter.addOne(list, state)
  )
);
