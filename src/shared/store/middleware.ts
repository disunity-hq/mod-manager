import { Middleware } from 'redux';
import { LOCATION_CHANGE, routerMiddleware } from 'connected-react-router';
import { RootState, RootAction, StoreScope } from './types';
import {
  setNavBar1Expanded,
  setNavBar2Expanded,
} from '../../renderer/components/window/NavBar/actions';
import { createEpicMiddleware } from 'redux-observable';
import { forwardToMain, forwardToRenderer, triggerAlias } from 'electron-redux';
import createLogger from 'redux-cli-logger';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const navbarClose: Middleware = ({ dispatch, getState }) => next => action => {
  const returnValue = next(action);

  if (action.type === LOCATION_CHANGE) {
    const state: RootState = getState();
    const segments = state.router.location.pathname.split('/').filter((s): boolean => !!s);
    switch (segments.length) {
      case 0:
        if (!state.navBar.expanded.t1) dispatch(setNavBar1Expanded(true));
        break;
      case 1:
      default:
        if (state.navBar.expanded.t1) dispatch(setNavBar1Expanded(false));
        if (!state.navBar.expanded.t2) dispatch(setNavBar2Expanded(true));
        break;
    }
  }
  return returnValue;
};

export const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState, void>();

export const createMiddleware = (scope: StoreScope): Middleware[] => {
  let middlewares: Middleware[] = [epicMiddleware, navbarClose];

  if (scope === 'renderer') {
    const router = routerMiddleware(require('./history').default);
    middlewares = [forwardToMain, router, ...middlewares];
  } else if (scope === 'main') {
    const logger = createLogger({
      downArrow: 'V',
      rightArrow: '>',
    });
    middlewares = [triggerAlias, logger, ...middlewares, forwardToRenderer];
  }

  return middlewares;
};

export default createMiddleware;
