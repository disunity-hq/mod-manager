import { combineReducers } from 'redux';

import navBarReducer from '../components/window/NavBar/reducers';
import { createReducer, createCustomAction, createStandardAction, Action, ActionType } from 'typesafe-actions';
import Sider, { SiderTheme } from 'antd/lib/layout/Sider';

export const changeTheme = createStandardAction('CHANGE_THEME')<SiderTheme>();

const initialState: SiderTheme = "dark";

const theme = createReducer(initialState).handleAction(changeTheme, (_state, action: any) => (action.payload));

const rootReducer = combineReducers({
    navBar: navBarReducer,
    theme: theme
});

export default rootReducer;
