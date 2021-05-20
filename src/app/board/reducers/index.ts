import * as fromBoard from '@monster/board/reducers/board.reducer';
import * as fromCards from '@monster/board/reducers/cards.reducer';
import * as fromLists from '@monster/board/reducers/lists.reducer';
import * as fromRoot from '@monster/reducers';
import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export const boardFeatureKey = 'board';

export interface BoardFeatureState {
  [fromCards.cardsFeatureKey]: fromCards.State;
  [fromLists.listsFeatureKey]: fromLists.State;
  [fromBoard.boardFeatureKey]: fromBoard.State;
}

export interface State extends fromRoot.State {
  [boardFeatureKey]: BoardFeatureState;
}

export function reducers(state: BoardFeatureState | undefined, action: Action) {
  return combineReducers({
    [fromCards.cardsFeatureKey]: fromCards.reducer,
    [fromLists.listsFeatureKey]: fromLists.reducer,
    [fromBoard.boardFeatureKey]: fromBoard.reducer,
  })(state, action);
}

export const selectBoardFeatureState =
  createFeatureSelector<BoardFeatureState>(boardFeatureKey);

/**
 * Card Entities reducer
 */
export const selectCardsState = createSelector(
  selectBoardFeatureState,
  (state) => state.cards
);

export const selectSelectedCardId = createSelector(
  selectCardsState,
  fromCards.selectId
);

export const {
  selectIds: selectCardIds,
  selectEntities: selectCardEntities,
  selectAll: selectAllCards,
  selectTotal: selectTotalCards,
} = fromCards.adapter.getSelectors(selectCardsState);

export const selectSelectedCard = createSelector(
  selectCardEntities,
  selectSelectedCardId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * List Entities reducer
 */
export const selectListsState = createSelector(
  selectBoardFeatureState,
  (state) => state.lists
);

export const {
  selectIds: selectListIds,
  selectEntities: selectListEntities,
  selectAll: selectAllLists,
  selectTotal: selectTotalLists,
} = fromLists.adapter.getSelectors(selectListsState);

/**
 * Board reducer
 */
export const selectBoardState = createSelector(
  selectBoardFeatureState,
  (state) => state.board
);

export const selectBoardLoaded = createSelector(
  selectBoardState,
  fromBoard.getLoaded
);
export const getBoardLoading = createSelector(
  selectBoardState,
  fromBoard.getLoading
);
export const selectBoard = createSelector(selectBoardState, fromBoard.getBoard);

export const selectBoardLists = createSelector(
  selectAllLists,
  selectBoard,
  (lists, board) => {
    return board && lists.filter((list) => list.boardId === board.id);
  }
);
