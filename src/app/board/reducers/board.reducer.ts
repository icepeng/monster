import { createReducer, on } from '@ngrx/store';
import { BoardApiActions, BoardPageActions } from '../actions';

import { Board } from '../models';

export const boardFeatureKey = 'board';

export interface State {
  loaded: boolean;
  loading: boolean;
  board: Board;
}

const initialState: State = {
  loaded: false,
  loading: false,
  board: null!,
};

export const reducer = createReducer(
  initialState,
  on(BoardPageActions.enter, (state) => ({
    ...state,
    loading: true,
  })),
  on(BoardApiActions.loadBoardSuccess, (state, { board }) => ({
    loaded: true,
    loading: false,
    board: board.board,
  }))
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getBoard = (state: State) => state.board;
