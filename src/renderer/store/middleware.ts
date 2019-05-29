import { Middleware } from 'redux';
import { LOCATION_CHANGE } from 'connected-react-router';
import { RootState } from './types';
import { setNavBar1Expanded, setNavBar2Expanded } from '../components/window/NavBar/actions';

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
