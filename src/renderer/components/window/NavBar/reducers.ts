import {
  toggleNavBar1Expanded,
  toggleNavBar2Expanded,
  setNavBar1Expanded,
  setNavBar2Expanded,
} from './actions';
import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';
import { RootAction } from '../../../../shared/store/types';

export interface ExpandedState {
  t1: boolean;
  t2: boolean;
}

const initialState: ExpandedState = {
  t1: true,
  t2: true,
};

const expanded = createReducer<ExpandedState, RootAction>(initialState)
  .handleAction(toggleNavBar1Expanded, (state): ExpandedState => ({ ...state, t1: !state.t1 }))
  .handleAction(toggleNavBar2Expanded, (state): ExpandedState => ({ ...state, t2: !state.t2 }))
  .handleAction(
    setNavBar1Expanded,
    (state, action): ExpandedState => ({ ...state, t1: action.payload })
  )
  .handleAction(
    setNavBar2Expanded,
    (state, action): ExpandedState => ({ ...state, t2: action.payload })
  );

const navBarReducer = combineReducers({
  expanded,
});

export default navBarReducer;
