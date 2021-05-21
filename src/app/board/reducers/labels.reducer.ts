import { BoardApiActions } from '@monster/board/actions';
import { Label } from '@monster/board/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

export const labelsFeatureKey = 'labels';

export interface State extends EntityState<Label> {}

export const adapter: EntityAdapter<Label> = createEntityAdapter<Label>({
  selectId: (label: Label) => label.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({});

export const reducer = createReducer(
  initialState,
  on(BoardApiActions.loadBoardSuccess, (state, { board }) =>
    adapter.setAll(board.labels, state)
  )
);
