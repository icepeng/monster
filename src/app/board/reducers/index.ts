import * as fromBoard from '@monster/board/reducers/board.reducer';
import * as fromCards from '@monster/board/reducers/cards.reducer';
import * as fromComments from '@monster/board/reducers/comments.reducer';
import * as fromLists from '@monster/board/reducers/lists.reducer';
import * as fromLabels from '@monster/board/reducers/labels.reducer';
import * as fromCardLabels from '@monster/board/reducers/card-labels.reducer';
import * as fromUI from '@monster/board/reducers/ui.reducer';
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
  [fromComments.commentsFeatureKey]: fromComments.State;
  [fromLists.listsFeatureKey]: fromLists.State;
  [fromLabels.labelsFeatureKey]: fromLabels.State;
  [fromCardLabels.cardLabelsFeatureKey]: fromCardLabels.State;
  [fromBoard.boardFeatureKey]: fromBoard.State;
  [fromUI.uiFeatureKey]: fromUI.State;
}

export interface State extends fromRoot.State {
  [boardFeatureKey]: BoardFeatureState;
}

export function reducers(state: BoardFeatureState | undefined, action: Action) {
  return combineReducers({
    [fromCards.cardsFeatureKey]: fromCards.reducer,
    [fromComments.commentsFeatureKey]: fromComments.reducer,
    [fromLists.listsFeatureKey]: fromLists.reducer,
    [fromLabels.labelsFeatureKey]: fromLabels.reducer,
    [fromCardLabels.cardLabelsFeatureKey]: fromCardLabels.reducer,
    [fromBoard.boardFeatureKey]: fromBoard.reducer,
    [fromUI.uiFeatureKey]: fromUI.reducer,
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

export const {
  selectIds: selectCardIds,
  selectEntities: selectCardEntities,
  selectAll: selectAllCards,
  selectTotal: selectTotalCards,
} = fromCards.adapter.getSelectors(selectCardsState);

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
 * Label Entities reducer
 */
export const selectLabelsState = createSelector(
  selectBoardFeatureState,
  (state) => state.labels
);

export const {
  selectIds: selectLabelIds,
  selectEntities: selectLabelEntities,
  selectAll: selectAllLabels,
  selectTotal: selectTotalLabels,
} = fromLabels.adapter.getSelectors(selectLabelsState);

/**
 * Card-Label Entities reducer
 */
export const selectCardLabelsState = createSelector(
  selectBoardFeatureState,
  (state) => state.cardLabels
);

export const {
  selectIds: selectCardLabelIds,
  selectEntities: selectCardLabelEntities,
  selectAll: selectAllCardLabels,
  selectTotal: selectTotalCardLabels,
} = fromCardLabels.adapter.getSelectors(selectCardLabelsState);

/**
 * Comment Entities reducer
 */
export const selectCommentsState = createSelector(
  selectBoardFeatureState,
  (state) => state.comments
);

export const {
  selectIds: selectCommentIds,
  selectEntities: selectCommentEntities,
  selectAll: selectAllComments,
  selectTotal: selectTotalComments,
} = fromComments.adapter.getSelectors(selectCommentsState);

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

/**
 * UI reducer
 */
export const selectUIState = createSelector(
  selectBoardFeatureState,
  (state) => state.ui
);

export const selectLabelExpand = createSelector(
  selectUIState,
  fromUI.getLabelExpand
);
