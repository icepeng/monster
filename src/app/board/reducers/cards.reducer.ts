import { moveItemIndex, transferArrayItem } from '@icepeng/monster-lib';
import { BoardApiActions, BoardPageActions } from '@monster/board/actions';
import { Card } from '@monster/board/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

export const cardsFeatureKey = 'cards';

export interface State extends EntityState<Card> {}

export const adapter: EntityAdapter<Card> = createEntityAdapter<Card>({
  selectId: (card: Card) => card.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(BoardApiActions.loadBoardSuccess, (state, { board }) =>
    adapter.setAll(board.cards, state)
  ),
  on(BoardApiActions.addCardSuccess, (state, { card }) =>
    adapter.addOne(card, state)
  ),
  on(
    BoardPageActions.moveCard,
    (state, { previousIndex, currentIndex, previousList, currentList }) => {
      const currentCards = (state.ids as number[]).map(
        (id) => state.entities[id]!
      );
      if (previousList === currentList) {
        const cards = moveItemIndex(
          currentCards.filter((x) => x.listId === currentList),
          previousIndex,
          currentIndex
        );
        return adapter.upsertMany(cards, state);
      } else {
        const cards = transferArrayItem(
          currentCards.filter((x) => x.listId === previousList),
          currentCards.filter((x) => x.listId === currentList),
          previousIndex,
          currentIndex,
          currentList
        );
        return adapter.upsertMany(cards, state);
      }
    }
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
  on(BoardApiActions.editCardTitleSuccess, (state, { card }) =>
    adapter.updateOne(
      {
        id: card.id,
        changes: {
          title: card.title,
        },
      },
      state
    )
  ),
  on(BoardApiActions.editCardDescriptionSuccess, (state, { card }) =>
    adapter.updateOne(
      {
        id: card.id,
        changes: {
          description: card.description,
        },
      },
      state
    )
  ),
  on(BoardApiActions.deleteCardSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  ),
  on(BoardApiActions.deleteListSuccess, (state, { id, cardIds }) =>
    adapter.removeMany((cards) => cards.listId === id, state)
  )
);
