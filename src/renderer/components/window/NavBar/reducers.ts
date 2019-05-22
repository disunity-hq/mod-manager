
import { toggleNavBarExpanded } from './actions';
import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';


const expanded = 
    createReducer(false)
    .handleAction(toggleNavBarExpanded, (state, _) => !state);

const navBarReducer = combineReducers({
    expanded
});

export default navBarReducer;