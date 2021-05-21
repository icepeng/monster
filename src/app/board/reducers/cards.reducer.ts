import { BoardApiActions } from '@monster/board/actions';
import { Card } from '@monster/board/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

export const cardsFeatureKey = 'cards';

export interface State extends EntityState<Card> {
  selectedCardId: string | null;
}

export const adapter: EntityAdapter<Card> = createEntityAdapter<Card>({
  selectId: (card: Card) => card.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedCardId: null,
});

export const reducer = createReducer(
  initialState,
  on(BoardApiActions.loadBoardSuccess, (state, { board }) =>
    adapter.setAll(board.cards, state)
  ),
  on(BoardApiActions.addCardSuccess, (state, { card }) =>
    adapter.addOne(card, state)
  ),
  on(BoardApiActions.moveCardSuccess, (state, { cards }) =>
    adapter.upsertMany(cards, state)
  ),
  on(BoardApiActions.toggleDueSuccess, (state, { card }) =>
    adapter.updateOne({
      id: card.id,
      changes: {
        dueComplete: card.dueComplete,
      }
    }, state)
  )
  // on(ViewCardPageActions.selectCard, (state, { id }) => ({
  //   ...state,
  //   selectedCardId: id,
  // }))
);

export const selectId = (state: State) => state.selectedCardId;
