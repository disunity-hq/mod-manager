import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import * as packageDetailsActions from '../components/pages/ModDetails/actions';
import * as navBarActions from '../components/window/NavBar/actions';
import * as packageTableActions from './games/actions';
import packageTableEpics from './games/epics';
import navBarReducer from '../components/window/NavBar/reducers';
import packageDetailsReducer from '../components/pages/ModDetails/reducer';
import themeReducer from './theme-reducer';
import history from '../history';
import { changeTheme } from './theme-reducer';
import { combineEpics } from 'redux-observable';

export const rootAction = {
  navBar: navBarActions,
  theme: changeTheme,
  packageDetails: packageDetailsActions,
  packageTable: packageTableActions,
};

export const rootReducer = combineReducers({
  navBar: navBarReducer,
  theme: themeReducer,
  router: connectRouter(history),
  packageDetails: packageDetailsReducer,
});

export const rootEpic = combineEpics(packageTableEpics);
