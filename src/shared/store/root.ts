import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import * as navBarActions from '../../renderer/components/window/NavBar/actions';
import * as gamesActions from './games/actions';
import {
  actions as packagesActions,
  reducer as packagesReducer,
  epics as packagesEpics,
} from './packages';
import gamesEpics from './games/epics';
import navBarReducer from '../../renderer/components/window/NavBar/reducers';
import themeReducer from './theme-reducer';
import gamesReducer from './games/reducer';
import history from './history';
import { changeTheme } from './theme-reducer';
import { combineEpics, Epic } from 'redux-observable';
import { of } from 'rxjs';
import { RootAction } from 'typesafe-actions/dist/create-reducer';
import { RootState } from './types';

const nullEpic: Epic<RootAction, RootAction, RootState, void> = () => of();

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

export const rootEpics = {
  main: combineEpics(gamesEpics, packagesEpics),
  renderer: combineEpics(nullEpic),
};
