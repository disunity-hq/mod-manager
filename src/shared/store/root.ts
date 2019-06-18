import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import * as navBarActions from '../../renderer/components/window/NavBar/actions';
import * as gamesActions from './games/actions';
import {
  actions as packagesActions,
  reducer as packagesReducer,
  epics as packagesEpics,
} from './packages';
import packageTableEpics from './games/epics';
import navBarReducer from '../../renderer/components/window/NavBar/reducers';
import themeReducer from './theme-reducer';
import gamesReducer from './games/reducer';
import history from './history';
import { changeTheme } from './theme-reducer';
import { combineEpics } from 'redux-observable';

export const rootAction = {
  navBar: navBarActions,
  theme: changeTheme,
  games: gamesActions,
  packages: packagesActions,
};

export const rootReducer = combineReducers({
  navBar: navBarReducer,
  theme: themeReducer,
  router: connectRouter(history),
  games: gamesReducer,
  packages: packagesReducer,
});

export const rootEpic = combineEpics(packageTableEpics, packagesEpics);
