
import { toggleNavBar1Expanded, toggleNavBar2Expanded, toggleNavBar3Expanded, setNavBar1Expanded, setNavBar2Expanded, setNavBar3Expanded } from './actions';
import { createReducer, PayloadAction } from 'typesafe-actions';
import { combineReducers } from 'redux';

export interface ExpandedState {
    t1: boolean;
    t2: boolean;
    t3: boolean;
}

const initialState: ExpandedState = {
    t1: true, t2: true, t3: true
}

const expanded =
    createReducer(initialState)
        .handleAction(toggleNavBar1Expanded, (state): ExpandedState => ({ ...state, t1: !state.t1 }))
        .handleAction(toggleNavBar2Expanded, (state): ExpandedState => ({ ...state, t2: !state.t2 }))
        .handleAction(toggleNavBar3Expanded, (state): ExpandedState => ({ ...state, t3: !state.t3 }))
        .handleAction(setNavBar1Expanded, (state, action: ReturnType<typeof setNavBar1Expanded>): ExpandedState => ({ ...state, t1: action.payload }))
        .handleAction(setNavBar2Expanded, (state, action: ReturnType<typeof setNavBar2Expanded>): ExpandedState => ({ ...state, t2: action.payload }))
        .handleAction(setNavBar3Expanded, (state, action: ReturnType<typeof setNavBar3Expanded>): ExpandedState => ({ ...state, t3: action.payload }));


const navBarReducer = combineReducers({
    expanded
});

export default navBarReducer;
