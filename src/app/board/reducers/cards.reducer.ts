import { BoardApiActions, BoardPageActions } from '@monster/board/actions';
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
  on(BoardApiActions.toggleCardDueSuccess, (state, { card }) =>
    adapter.updateOne(
      {
        id: card.id,
        changes: {
          dueComplete: card.dueComplete,
        },
      },
      state
    )
  ),
  on(BoardPageActions.selectCard, (state, { cardId }) => ({
    ...state,
    selectedCardId: cardId,
  })),
  on(BoardPageActions.unselectCard, (state) => ({
    ...state,
    selectedCardId: null,
  }))
);

export const selectId = (state: State) => state.selectedCardId;
