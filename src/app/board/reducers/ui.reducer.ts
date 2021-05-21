import { createReducer, on } from '@ngrx/store';
import { BoardPageActions } from '../actions';

export const uiFeatureKey = 'ui';

export interface State {
  labelExpand: boolean;
}

const initialState: State = {
  labelExpand: false,
};

export const reducer = createReducer(
  initialState,
  on(BoardPageActions.toggleLabelExpand, (state) => ({
    labelExpand: !state.labelExpand,
  }))
);

export const getLabelExpand = (state: State) => state.labelExpand;
