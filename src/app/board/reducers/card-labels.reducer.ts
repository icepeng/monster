import { BoardApiActions } from '@monster/board/actions';
import { CardLabel } from '@monster/board/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

export const cardLabelsFeatureKey = 'cardLabels';

export interface State extends EntityState<CardLabel> {}

export const adapter: EntityAdapter<CardLabel> = createEntityAdapter<CardLabel>(
  {
    selectId: (label: CardLabel) => label.id,
    sortComparer: false,
  }
);

export const initialState: State = adapter.getInitialState({
  selectedLabelId: null,
});

export const reducer = createReducer(
  initialState,
  on(BoardApiActions.loadBoardSuccess, (state, { board }) =>
    adapter.setAll(board.cardLabels, state)
  )
);
